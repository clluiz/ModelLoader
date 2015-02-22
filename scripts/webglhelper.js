/**
 * Inicialização do webgl extraída de 
 * https://developer.mozilla.org/en-US/docs/Web/WebGL/Getting_started_with_WebGL?redirectlocale=en-US&redirectslug=WebGL%2FGetting_started_with_WebGL
 * @author Cleiton Luiz Rocha Teodoro cleiton.vanquish@gmail.com
 * @created 28/07/2013
 */
function WebGlHelper( context ) {
    
}

WebGlHelper.prototype.TestarSuporteWebGl = function() {
   
    var e = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"],
            result, context, i;

    for (i = 0; i < e.length; i += 1) {
        try {
            context = document.getElementsByTagName("canvas")[0].getContext(e[i]);
            if (context) {
                result = {
                    name: e[i]
                };
            }
        } catch (error) {
            
            alert(error);
        }

        if (context) {
            break;
        }
    }
    return result;
};

WebGlHelper.prototype.BuildShader = function( context, source, type ) {
  
    var shader = null;    
    shader = context.createShader(type);

    context.shaderSource(shader, source);
    context.compileShader(shader);

    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        alert(context.getShaderInfoLog(shader));
        return null;
    }
    return shader;
};

WebGlHelper.prototype.GetShader = function( context, id ) {
    
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader = null;
    if (shaderScript.type == "x-shader/x-fragment") {
        
        shader = context.createShader(context.FRAGMENT_SHADER);
    
    } else if (shaderScript.type == "x-shader/x-vertex") {
        
        shader = context.createShader(context.VERTEX_SHADER);
    } 

    context.shaderSource(shader, str);
    context.compileShader(shader);

    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        alert(context.getShaderInfoLog(shader));
        return null;
    }
    return shader;
};

