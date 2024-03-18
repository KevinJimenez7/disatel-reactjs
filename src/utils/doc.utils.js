export function copyToClipboard (content = ""){
    navigator.clipboard.writeText(content)
    .then(() => {alert('Se copió al portapapeles')})
    .catch(() => {console.log('Error al copiar al portapapeles')})
}