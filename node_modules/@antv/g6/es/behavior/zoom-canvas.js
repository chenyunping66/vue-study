import { mat3 } from '@antv/matrix-util';
import { clone } from '@antv/util';
var DELTA = 0.05;
export default {
  getDefaultCfg: function getDefaultCfg() {
    return {
      sensitivity: 2,
      minZoom: undefined,
      maxZoom: undefined,
      enableOptimize: false,
      optimizeZoom: 0.7,
      fixSelectedItems: {
        fixAll: false,
        fixLineWidth: false,
        fixLabel: false,
        fixState: 'selected'
      }
    };
  },
  getEvents: function getEvents() {
    var fixSelectedItems = this.fixSelectedItems;
    if (!fixSelectedItems.fixState) fixSelectedItems.fixState = 'selected';

    if (fixSelectedItems.fixAll) {
      fixSelectedItems.fixLineWidth = true;
      fixSelectedItems.fixLabel = true;
    }

    return {
      wheel: 'onWheel'
    };
  },
  onWheel: function onWheel(e) {
    var _a = this,
        graph = _a.graph,
        fixSelectedItems = _a.fixSelectedItems;

    if (!this.shouldUpdate.call(this, e)) {
      return;
    }

    e.preventDefault();
    var canvas = graph.get('canvas');
    var point = canvas.getPointByClient(e.clientX, e.clientY);
    var sensitivity = this.get('sensitivity');
    var graphZoom = graph.getZoom();
    var ratio = graphZoom;
    var zoom = graphZoom; // 兼容IE、Firefox及Chrome

    if (e.wheelDelta < 0) {
      ratio = 1 - DELTA * sensitivity;
    } else {
      ratio = 1 / (1 - DELTA * sensitivity);
    }

    zoom = graphZoom * ratio; // const zoom = ratio * graphZoom;

    var minZoom = this.get('minZoom') || graph.get('minZoom');
    var maxZoom = this.get('maxZoom') || graph.get('maxZoom');

    if (zoom > maxZoom || zoom < minZoom) {
      return;
    }

    var enableOptimize = this.get('enableOptimize');

    if (enableOptimize) {
      var optimizeZoom = this.get('optimizeZoom');
      var currentZoom = graph.getZoom();
      var nodes = graph.getNodes();
      var edges = graph.getEdges();
      var nodesLength = nodes.length;
      var edgesLength = edges.length;

      if (currentZoom < optimizeZoom) {
        for (var n = 0; n < nodesLength; n++) {
          var node = nodes[n];

          if (!node.destroyed) {
            var children = node.getContainer().get('children');
            var childrenLength = children.length;

            for (var c = 0; c < childrenLength; c++) {
              var shape = children[c];

              if (!shape.destoryed && !shape.get('isKeyShape')) {
                shape.hide();
              }
            }
          }
        }

        for (var e_1 = 0; e_1 < edgesLength; e_1++) {
          var edge = edges[e_1];
          var children = edge.getContainer().get('children');
          var childrenLength = children.length;

          for (var c = 0; c < childrenLength; c++) {
            var shape = children[c];

            if (!shape.get('isKeyShape')) {
              shape.hide();
            }
          }
        }
      } else {
        for (var n = 0; n < nodesLength; n++) {
          var node = nodes[n];
          var children = node.getContainer().get('children');
          var childrenLength = children.length;

          for (var c = 0; c < childrenLength; c++) {
            var shape = children[c];

            if (!shape.get('visible')) {
              shape.show();
            }
          }
        }

        for (var e_2 = 0; e_2 < edgesLength; e_2++) {
          var edge = edges[e_2];
          var children = edge.getContainer().get('children');
          var childrenLength = children.length;

          for (var c = 0; c < childrenLength; c++) {
            var shape = children[c];

            if (!shape.get('visible')) {
              shape.show();
            }
          }
        }
      }
    } // fix the items when zooming


    if (graphZoom <= 1) {
      var fixNodes = void 0,
          fixEdges = void 0;

      if (fixSelectedItems.fixAll || fixSelectedItems.fixLineWidth || fixSelectedItems.fixLabel) {
        fixNodes = graph.findAllByState('node', fixSelectedItems.fixState);
        fixEdges = graph.findAllByState('edge', fixSelectedItems.fixState);
        var scale = graphZoom / zoom;
        var fixNodesLength = fixNodes.length;

        for (var fn = 0; fn < fixNodesLength; fn++) {
          var node = fixNodes[fn];
          var group = node.getContainer();
          var nodeModel = node.getModel();
          var itemStateStyle = node.getStateStyle(fixSelectedItems.fixState);
          var shapeStateStyle = node.get('shapeFactory').getShape(nodeModel.shape || nodeModel.type).getStateStyle(fixSelectedItems.fixState, node)[fixSelectedItems.fixState];

          if (fixSelectedItems.fixAll) {
            if (zoom <= 1) {
              var groupMatrix = clone(group.getMatrix());
              if (!groupMatrix) groupMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

              var _b = node.getModel(),
                  x = _b.x,
                  y = _b.y;

              mat3.translate(groupMatrix, groupMatrix, [-x, -y]);
              mat3.scale(groupMatrix, groupMatrix, [scale, scale]);
              mat3.translate(groupMatrix, groupMatrix, [x, y]);
              group.setMatrix(groupMatrix);
            }
          } else {
            var children = group.get('children');
            var childrenLength = children.length;

            for (var c = 0; c < childrenLength; c++) {
              var shape = children[c];
              var fontSize = void 0,
                  lineWidth = void 0;

              if (fixSelectedItems.fixLabel) {
                var shapeType = shape.get('type');

                if (shapeType === 'text') {
                  fontSize = shape.attr('fontSize') || 12;
                  var itemStyle = itemStateStyle[shape.get('name')];
                  var shapeStyle = shapeStateStyle[shape.get('name')];
                  var itemFontSize = itemStyle ? itemStyle.fontSize : 12;
                  var shapeFontSize = shapeStyle ? shapeStyle.fontSize : 12;
                  var oriFontSize = itemFontSize || shapeFontSize || 12;
                  if (zoom <= 1) shape.attr('fontSize', oriFontSize / zoom); // * graphZoom / zoom

                  if (lineWidth) break;
                }
              }

              if (fixSelectedItems.fixLineWidth) {
                if (shape.get('isKeyShape')) {
                  lineWidth = shape.attr('lineWidth') || 0;
                  var oriLineWidth = itemStateStyle.lineWidth || shapeStateStyle.lineWidth || 0;
                  if (zoom <= 1) shape.attr('lineWidth', oriLineWidth / zoom); // * graphZoom / zoom

                  if (fontSize) break;
                }
              }
            }
          }
        }

        var fixEdgesLength = fixEdges.length;

        for (var fe = 0; fe < fixEdgesLength; fe++) {
          var edge = fixEdges[fe];
          var group = edge.getContainer();
          var children = group.get('children');
          var nodeModel = edge.getModel();
          var itemStateStyle = edge.getStateStyle(fixSelectedItems.fixState);
          var shapeStateStyle = edge.get('shapeFactory').getShape(nodeModel.shape || nodeModel.type).getStateStyle(fixSelectedItems.fixState, edge)[fixSelectedItems.fixState];
          var childrenLength = children.length;

          for (var c = 0; c < childrenLength; c++) {
            var shape = children[c];
            var fontSize = void 0,
                lineWidth = void 0;

            if (fixSelectedItems.fixLabel || fixSelectedItems.fixAll) {
              var shapeType = shape.get('type');

              if (shapeType === 'text') {
                fontSize = shape.attr('fontSize') || 12;
                var itemStyle = itemStateStyle[shape.get('name')];
                var shapeStyle = shapeStateStyle[shape.get('name')];
                var itemFontSize = itemStyle ? itemStyle.fontSize : 12;
                var shapeFontSize = shapeStyle ? shapeStyle.fontSize : 12;
                var oriFontSize = itemFontSize || shapeFontSize || 12;
                if (zoom <= 1) shape.attr('fontSize', oriFontSize / zoom);
                if (lineWidth) break;
              }
            }

            if (fixSelectedItems.fixLineWidth || fixSelectedItems.fixAll) {
              if (shape.get('isKeyShape')) {
                lineWidth = shape.attr('lineWidth') || 0;
                var oriLineWidth = itemStateStyle.lineWidth || shapeStateStyle.lineWidth || 1;
                if (zoom <= 1) shape.attr('lineWidth', oriLineWidth / zoom);
                if (fontSize) break;
              }
            }
          }
        }
      }
    }

    graph.zoomTo(zoom, {
      x: point.x,
      y: point.y
    });
    graph.emit('wheelzoom', e);
  }
};