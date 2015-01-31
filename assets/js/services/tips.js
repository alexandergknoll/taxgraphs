'use strict';

/* @ngInject */
function tips(localStorageService) {
  var service = {},
      list;

  service.key = 'taxAppTips';

  if (!localStorageService.get(service.key)) {
    list = [
      {
        closed: false,
        text: 'Hover over or click on the graph to view tax rates ' +
          'at a specific income.'
      }
    ];
    localStorageService.set(service.key, list);
  }

  service.list = localStorageService.get(service.key);

  service.close = function(index) {
    index = parseInt(index, 10);
    service.list[index].closed = true;
    localStorageService.set(service.key, service.list);
  };

  return service;
}

module.exports = tips;