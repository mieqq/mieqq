function isWebApi() {
    if (typeof window != 'undefined') {
        return true;
    }
    return false;
}

if (isWebApi()) {
    console.log('webview');
} else {
    console.log('jsc');
}

$done()
