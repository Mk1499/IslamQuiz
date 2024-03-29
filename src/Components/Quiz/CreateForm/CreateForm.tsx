import React, {useEffect, useState, useRef, memo} from 'react';
import {View, Text} from 'react-native';
import {MyInput, MyDropDown, MyButton, MyTextArea} from '../../Native';
import I18n, {getActiveLang} from '../../../translate';
import {preData} from '../../../Services/quiz-service';
import makeStyle from './CreateFrom.style';
import {useTheme} from '../../../Theme/ThemeProvider';
import {showError} from '../../../Services/toast-service';
import DB from '../../../Config/DB';
import MyDatePicker from '../../Native/MyDatePicker/MyDatePicker';

type MyProps = {
  handleNext: Function;
  processing: Boolean;
};

function CreateForm({handleNext, processing}: MyProps) {
  const [categories, setCategories] = useState();
  const [durations, setDurations] = useState();
  const [categoryID, setCategoryID] = useState();
  const [durationID, setDurationID] = useState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [questionNum, setQuestionNum] = useState('');
  const [lang, setLang] = useState('ar');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const nameRef = useRef();
  const catRef = useRef();
  const quesNumRef = useRef();
  const durationRef = useRef();
  const descriptionRef = useRef();
  const langRef = useRef();

  const {colors} = useTheme();
  const styles = makeStyle(colors);

  useEffect(() => {
    preData()
      .then(({data}) => {
        // console.log('Data : ', data);
        setCategories(data.categories);
        setDurations(data.durations);
      })
      .catch(err => {
        console.log('Err : ', err);
      });
  }, []);

  function optionsConverter(data) {
    let options = data?.map(item => ({
      label: getActiveLang() === 'en' ? item.enName : item.arName,
      value: item._id,
    }));
    // console.log('op : ', options);
    return options;
  }

  function submit() {
    if (!name || !description || !durationID || !categoryID || !questionNum) {
      showError(I18n.CreateQuiz.allFieldsReq);
    } else {
      handleNext({
        name,
        description,
        duration: durationID,
        category: categoryID,
        questionNum,
        lang,
        startDate,
        endDate,
      });
      resetForm();
    }
  }

  function resetForm() {
    nameRef?.current.clear();
    descriptionRef?.current.clear();
    quesNumRef?.current.clear();
    catRef?.current.clear();
    durationRef?.current.clear();
    langRef?.current.clear();
    setName(null);
    setCategoryID(null);
    setQuestionNum(null);
    setDurationID(null);
    setDescription(null);
    setLang(null);
  }

  return (
    <View style={styles.formCont}>
      <Text style={styles.title}>{I18n.CreateQuiz.createNew}</Text>
      <Text style={styles.note}>{I18n.CreateQuiz.createDesc}</Text>

      <View style={styles.line} />
      <MyInput
        placeholder={I18n.CreateQuiz.quizName}
        onChange={t => setName(t)}
        style={styles.input}
        ref={nameRef}
      />
      <MyDropDown
        label={I18n.CreateQuiz.lang}
        placeholder={I18n.CreateQuiz.lang}
        options={optionsConverter(DB.langs) || []}
        onChange={langID => {
          setLang(langID);
        }}
        ref={langRef}
        style={styles.dropDown}
        zIndex={400}
      />

      <MyDropDown
        label={I18n.CreateQuiz.category}
        placeholder={I18n.CreateQuiz.category}
        options={optionsConverter(categories) || []}
        onChange={catID => {
          setCategoryID(catID);
        }}
        ref={catRef}
        zIndex={200}
      />

      <MyInput
        placeholder={I18n.CreateQuiz.noOfQuestions}
        keyboardType="numeric"
        onChange={t => setQuestionNum(t)}
        style={styles.input}
        ref={quesNumRef}
      />
      <MyDropDown
        label={I18n.CreateQuiz.duration}
        placeholder={I18n.CreateQuiz.duration}
        // options={optionsConverter(durations)}
        options={optionsConverter(durations) || []}
        onChange={catID => {
          setDurationID(catID);
        }}
        ref={durationRef}
        zIndex={10}
      />
      <MyTextArea
        placeholder={I18n.CreateQuiz.description}
        onChange={t => setDescription(t)}
        ref={descriptionRef}
      />
      <MyDatePicker
        label={I18n.CreateQuiz.startDate}
        onChange={date => setStartDate(date)}
        initialDate={new Date()}
      />

      <MyDatePicker
        label={I18n.CreateQuiz.expireDate}
        onChange={date => setEndDate(date)}
        initialDate={startDate}
      />

      <MyButton
        label={I18n.Global.next}
        action={submit}
        processing={processing}
      />
    </View>
  );
}

export default memo(CreateForm);
