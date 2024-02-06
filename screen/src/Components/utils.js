export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('da-DK', options);
  }