(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir() {
        function linkfunc(scope, element, attributes, sortingController) {
            element.sortable({
                start: function (event, ui) {
                    ui.item.startPos = ui.item.index();
                },
                update: function (event, ui) {
                    var endingIndex = ui.item.index();
                    //console.log(endingIndex)
                    var startingIndex = ui.item.startPos;
                    //console.log(startingIndex)
                    sortingController.sortTheWidget(startingIndex, endingIndex);
                },
                axis: 'y',
                cursor: "move"

            });
        }

        return {
            link: linkfunc,
            controller: sortableController
        }

    }

    function sortableController(WidgetService, $routeParams) {
        var vm = this;
        vm.sortTheWidget = sortTheWidget;

        function sortTheWidget(start, end) {
            var pageId = $routeParams.pid;

            WidgetService
                .WidOrderUpdate(pageId, start, end)
                .then(function (response) {
                })

        }
    }

})();