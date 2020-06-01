Number.isNaN = require('is-nan');

/* eslint-disable no-use-before-define */
/* @ngInject */
function StateComparisonCtrl(
  $scope,
  $filter,
  taxData,
  taxService,
  graph,
  settings,
) {
  $scope.key = 'stateComparisonData';
  $scope.colors = settings.colors;
  $scope.animationTimes = settings.animationTimes;
  $scope.xAxisScales = settings.xAxisScales;
  $scope.years = taxData.years;
  $scope.states = taxData.states;
  $scope.filingStatuses = taxData.filingStatuses;
  $scope.deductions = taxData.deductions;
  $scope.credits = taxData.credits;
  $scope.toggleStates = toggleStates;
  $scope.drawGraph = drawGraph;

  taxData.get().then(init);

  function init() {
    setData();
    graph.init();
    drawGraph();
  }

  function setData() {
    $scope.data = settings.get($scope.key);
    $scope.settings = $scope.data.graph;
  }

  function toggleStates(bool) {
    $scope.states.forEach((state) => {
      $scope.data.states[state] = bool;
    });
  }

  function createTaxRateFn(taxes, status, isEffective) {
    const fnProp = isEffective
      ? 'calcTotalEffectiveTaxRate'
      : 'calcTotalMarginalTaxRate';

    return (income) => taxService[fnProp](taxes, income, status);
  }

  function rateFormatter(income, rate) {
    return $filter('percentage')(rate, 2);
  }

  function formatAdjustments() {
    const { deductions, credits } = $scope.data;

    deductions.state.income = deductions.federal.federalIncome;
    credits.state.income = credits.federal.federalIncome;
  }

  function updateGraphText(year, status) {
    const { axisFormats } = settings;
    const { data } = $scope;
    const hasDeduction = data.deductions.federal.federalIncome.standardDeduction;

    const primaryTitle = `Federal+State Income Tax Rates, ${year}`;
    const secondaryTitle = [
      $filter('splitCamelCase')(status),
      'Filing Status,',
      hasDeduction ? ' Standard Deduction' : 'no deductions',
    ].join(' ');
    graph.updateTitle(primaryTitle, secondaryTitle);
    graph.updateAxisLabels('Gross Income', 'Percent');
    graph.updateAxisFormats(axisFormats.dollar, axisFormats.percent);
  }

  function drawGraph() {
    const {
      states,
      year,
      status,
      graphLines,
      deductions: deductionSettings,
      credits: creditSettings,
    } = $scope.data;
    let { xMax } = $scope.settings;

    xMax = Number.isNaN(xMax) ? graph.defaults.xMax : xMax;

    if ($scope.settings.xAxisScale === settings.xAxisScales.log) {
      $scope.settings.xMin = Math.max($scope.settings.xMin, 1);
      xMax = Math.pow(10, Math.ceil(Math.log10(xMax)));
    }

    formatAdjustments();
    graph.clear();
    updateGraphText(year, status);
    graph.update($scope.settings);

    Object.keys(states).forEach((state) => {
      if (states[state]) {
        const rates = taxData.getAllRates(
          state,
          year,
          status,
          deductionSettings,
          creditSettings,
        );
        const taxes = taxData.getAllTaxes(
          state,
          year,
          status,
          deductionSettings,
          creditSettings,
        );
        const total = taxService.calcTotalMarginalTaxBrackets(rates, xMax, status);

        if (graphLines.effective) {
          graph.addLine({
            data: taxService.createTotalEffectiveTaxData(
              taxes,
              total,
              xMax,
              status,
            ),
            label: `${state} Effective`,
            tooltipFn: createTaxRateFn(taxes, status, true),
            formattedFn: rateFormatter,
            isInterpolated: true,
          });
        }

        if (graphLines.marginal) {
          graph.addLine({
            data: taxService.createTotalMarginalTaxData(
              taxes,
              total,
              xMax,
              status,
            ),
            label: `${state} Marginal`,
            tooltipFn: createTaxRateFn(taxes, status),
            formattedFn: rateFormatter,
          });
        }
      }
    });

    graph.drawLines();
    $scope.$emit('hideMobileControls');
    settings.set($scope.key, $scope.data);
  }
}

export default StateComparisonCtrl;
