function suportaArquivosHtml5() {
    
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        return true;
    } else {
        return false;
    }
}


