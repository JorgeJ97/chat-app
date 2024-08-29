import crypto from 'crypto';

const hashFileBuffer = (buffer, algorithm = 'sha256') => {
    const hash = crypto.createHash(algorithm);
    hash.update(buffer);
    return hash.digest('hex');
  };

export default hashFileBuffer;