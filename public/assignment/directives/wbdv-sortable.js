/**
 * Created by chaitanyakaul on 28/02/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);


        function sortableDir() {
        function linkfunc(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                cursor: "move",
            });
        }
        return {
            link: linkfunc
        }
    }
})();