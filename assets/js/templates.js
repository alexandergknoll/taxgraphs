angular.module('taxApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assets/templates/pages/state-breakdown.html',
    "<div class=\"section\"><h3>Data</h3><div ng-include=\"'assets/templates/partials/state-select.html'\"></div><div ng-include=\"'assets/templates/partials/tax-year.html'\"></div><div ng-include=\"'assets/templates/partials/filing-status.html'\"></div><div><label class=\"valign-top\">Deductions:</label><div class=\"inline-block\"><div ng-repeat=\"deduction in deductions\"><input type=\"checkbox\" name=\"{{ deduction }}\" id=\"{{ deduction }}\" ng-model=\"data.deductions[deduction]\"><label for=\"{{ deduction }}\">{{ deduction | splitCamelCase }}</label></div></div></div><div><label class=\"valign-top\">Graph Lines:</label><div class=\"inline-block\"><div><input type=\"checkbox\" name=\"effective-taxes\" id=\"effective-taxes\" ng-model=\"data.graphLines.effective\"><label for=\"effective-taxes\">Effective Taxes</label></div><div><input type=\"checkbox\" name=\"marginal-taxes\" id=\"marginal-taxes\" ng-model=\"data.graphLines.marginal\"><label for=\"marginal-taxes\">Marginal Taxes</label></div><div><input type=\"checkbox\" name=\"total-effective\" id=\"total-effective\" ng-model=\"data.graphLines.totalEffective\"><label for=\"total-effective\">Total Effective Tax</label></div><div><input type=\"checkbox\" name=\"total-marginal\" id=\"total-marginal\" ng-model=\"data.graphLines.totalMarginal\"><label for=\"total-marginal\">Total Marginal Tax</label></div></div></div><div class=\"subsection\" ng-include=\"'assets/templates/partials/graph-settings.html'\"></div></div>"
  );


  $templateCache.put('assets/templates/pages/state-comparison.html',
    "<div class=\"section\"><h3>Data</h3><div><label class=\"valign-top\">States:</label><div class=\"inline-block\"><div class=\"state-options\"><input type=\"checkbox\" name=\"all-states\" id=\"all-states\" ng-click=\"toggleStates(true)\" ng-model=\"toggleState\" ng-change=\"keepUnchecked()\"><label for=\"all-states\">All</label><input type=\"checkbox\" name=\"no-states\" id=\"no-states\" ng-click=\"toggleStates(false)\" ng-model=\"toggleState\" ng-change=\"keepUnchecked()\"><label for=\"no-states\">None</label></div></div><div class=\"states pure-g\"><div class=\"pure-u-1-3 pure-u-xl-1-4\" ng-repeat=\"state in states\"><input type=\"checkbox\" id=\"{{ state }}\" name=\"{{ state }}\" ng-model=\"data.states[state]\"><label for=\"{{ state }}\">{{ state }}</label></div></div></div><div ng-include=\"'assets/templates/partials/tax-year.html'\"></div><div ng-include=\"'assets/templates/partials/filing-status.html'\"></div><div><label class=\"valign-top\">Deductions:</label><div class=\"inline-block\"><div ng-repeat=\"deduction in deductions\"><input type=\"checkbox\" name=\"{{ deduction }}\" id=\"{{ deduction }}\" ng-model=\"data.deductions[deduction]\"><label for=\"{{ deduction }}\">{{ deduction | splitCamelCase }}</label></div></div></div><div><label class=\"valign-top\">Graph Lines:</label><div class=\"inline-block\"><div><input type=\"checkbox\" name=\"effective-taxes\" id=\"effective-taxes\" ng-model=\"data.graphLines.effective\"><label for=\"effective-taxes\">Total Effective Tax</label></div><div><input type=\"checkbox\" name=\"marginal-taxes\" id=\"marginal-taxes\" ng-model=\"data.graphLines.marginal\"><label for=\"marginal-taxes\">Total Marginal Tax</label></div></div></div><div class=\"subsection\" ng-include=\"'assets/templates/partials/graph-settings.html'\"></div></div>"
  );


  $templateCache.put('assets/templates/pages/take-home-pay.html',
    "<div class=\"section\"><h3>Data</h3><div ng-include=\"'assets/templates/partials/state-select.html'\"></div><div ng-include=\"'assets/templates/partials/tax-year.html'\"></div><div><label class=\"valign-top\">Deductions:</label><div class=\"inline-block\"><div ng-repeat=\"deduction in deductions\"><input type=\"checkbox\" name=\"{{ deduction }}\" id=\"{{ deduction }}\" ng-model=\"data.deductions[deduction]\"><label for=\"{{ deduction }}\">{{ deduction | splitCamelCase }}</label></div></div></div><div><label for=\"itemized\" class=\"valign-top\">Itemized<br>Deduction:</label><input type=\"text\" id=\"itemized\" name=\"itemized\" ng-model=\"data.itemized\"></div><div><label class=\"valign-top\">Graph Lines:</label><div class=\"inline-block\"><div><input type=\"checkbox\" name=\"single-income\" id=\"single-income\" ng-model=\"data.graphLines.single\"><label for=\"single-income\">Single Filing Status</label></div><div><input type=\"checkbox\" name=\"married-income\" id=\"married-income\" ng-model=\"data.graphLines.married\"><label for=\"married-income\">Married Filing Status</label></div></div></div><div class=\"subsection\" ng-include=\"'assets/templates/partials/graph-settings.html'\"></div></div>"
  );


  $templateCache.put('assets/templates/partials/filing-status.html',
    "<div><label for=\"status\">Filing Status:</label><select ng-model=\"data.status\" id=\"status\" name=\"status\" ng-options=\"v as (v | capitalize) for v in filingStatuses\"></select></div>"
  );


  $templateCache.put('assets/templates/partials/graph-settings.html',
    "<h3>Settings</h3><div><label for=\"x-max\">X Axis Max ($):</label><input type=\"text\" id=\"x-max\" name=\"x-max\" ng-model=\"settings.xMax\" required ng-pattern=\"/^\\d+$/\"></div><div><label for=\"animation-time\">Animation Time:</label><select id=\"animation-time\" name=\"animation-time\" ng-model=\"settings.animationTime\" ng-options=\"time as ((time / 1000) + (time === 1000 ? ' second' : ' seconds')) for time in animationTimes\"></select></div><div><label for=\"colors\">Color Scheme:</label><select id=\"colors\" name=\"colors\" ng-model=\"settings.colors\" ng-options=\"(key | capitalize) for (key, val) in colors\"></select></div><div class=\"text-center buttons\"><button class=\"pure-button pure-button-primary\" ng-click=\"drawGraph()\">Graph</button></div>"
  );


  $templateCache.put('assets/templates/partials/state-select.html',
    "<div><label for=\"state\">State:</label><select ng-model=\"data.state\" id=\"state\" name=\"state\" ng-options=\"v as (stateNames[v]) for v in states\"></select></div>"
  );


  $templateCache.put('assets/templates/partials/tax-year.html',
    "<div><label for=\"year\">Tax Year:</label><select ng-model=\"data.year\" id=\"year\" name=\"year\" ng-options=\"v as v for v in years\"></select></div>"
  );

}]);
