module.exports = {
  format_date: (date) => {
    if (!date) {
      console.log('Date is undefined or null');
      return 'Invalid date';
    }
    // Ensure the date is a valid Date object
    const validDate = new Date(date);
    if (isNaN(validDate)) {
      console.log('Invalid date value:', date);
      return 'Invalid date';
    }
    return validDate.toLocaleDateString();
  },
};