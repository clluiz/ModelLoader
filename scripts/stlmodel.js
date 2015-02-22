'use strict';
var stlmodel = function() {
    
    var _data;
    var _header = "";
    var _faceCount = 0;
    var _triangles = [];
    
    function getHeader() {
	
        var str = "";
        for (var i=0; i< 80; i++) {
            str += String.fromCharCode(_data.getUint8(i))
        };
        _header = str;
    };
    
    function getFacetCount() {
	
	_faceCount = _data.getUint32(80, true);
    }
    
    function buidFacets() {
	
	var offset = 84;
	var i, v;
	var nx;
	var ny;
	var nz;
	var x;
	var y;
	var z;
	var triangle;
	for( i = 0; i < _faceCount; i++ ) {
	    
	    triangle = {
	
		vertices : []	
	    };
	    
            nx = _data.getFloat32(offset, true);
            ny = _data.getFloat32(offset+4, true);
            nz = _data.getFloat32(offset+8, true);
	    
	    triangle.normal = { "x" : nx, "y" : ny, "z" : nz };
            offset += 12;
                
	    for (v = 0; v < 3; v++) {
                
                x = _data.getFloat32(offset, true);
                y = _data.getFloat32(offset+4, true);
                z = _data.getFloat32(offset+8, true);
		triangle.vertices.push( { "x" : x, "y" : y, "z" : z } );
                offset += 12;                
            };
	    offset += 2;
	    
	    _triangles.push( triangle );
	};	
    };

    function build() {

	getHeader();
        getFacetCount();
	buidFacets();
    };
    
    return {
        
        data : function( buffer ) {
            
            _data = new DataView( buffer );
            build();
        },
        
        header : function() {
            
            return _header;
        },
	
	triangles : function() {
	    
	    return _triangles;
	}
    };
};