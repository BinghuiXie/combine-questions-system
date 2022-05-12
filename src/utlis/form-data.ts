export function formData(data: any) {
    if (typeof data === 'object') {
      const form = new FormData();
      for (let i in data) {
        form.append(i, data[i]);
      }
      for (let pair of form.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      return form;
    }
    return data
  }