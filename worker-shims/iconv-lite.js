// Workers-compatible replacement for iconv-lite (used by raw-body/body-parser).
// Decoding is delegated to the runtime's TextDecoder.
function getDecoder(encoding) {
  const decoder = new TextDecoder(encoding || 'utf-8');
  return {
    write: (chunk) => decoder.decode(chunk, { stream: true }),
    end: () => decoder.decode()
  };
}

function decode(buffer, encoding) {
  return new TextDecoder(encoding || 'utf-8').decode(buffer);
}

function encodingExists(encoding) {
  try {
    new TextDecoder(encoding);
    return true;
  } catch {
    return false;
  }
}

module.exports = { getDecoder, decode, encodingExists };
