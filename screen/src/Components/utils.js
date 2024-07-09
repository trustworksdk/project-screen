export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long' };
    const date = new Date(dateString).toLocaleDateString('da-DK', options)
    return date.charAt(0).toUpperCase() + date.slice(1);
  }