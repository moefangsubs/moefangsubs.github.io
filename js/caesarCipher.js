// caesarCipher.js

// Fungsi enkripsi Caesar Cipher
function encryptCaesarCipher(text, shift) {
    var result = "";
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {  // Uppercase letters
            result += String.fromCharCode((charCode - 65 + shift) % 26 + 65);
        } else if (charCode >= 97 && charCode <= 122) {  // Lowercase letters
            result += String.fromCharCode((charCode - 97 + shift) % 26 + 97);
        } else {
            result += text.charAt(i);  // Non-alphabetic characters
        }
    }
    return result;
}

// Fungsi dekripsi Caesar Cipher
function decryptCaesarCipher(text, shift) {
    return encryptCaesarCipher(text, 26 - shift);  // Dekripsi dengan geseran ke arah yang berlawanan
}
