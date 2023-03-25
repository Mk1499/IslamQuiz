import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';

export function chooseImg() {
  return new Promise<DocumentPickerResponse[]>(async (resolve, reject) => {
    try {
      await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })
        .then(async res => {
          resolve(res);
        })
        .catch(err => {
          throw err;
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        //   throw err;
        reject(err);
      }
    }
  });
}
