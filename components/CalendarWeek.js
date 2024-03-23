import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import moment from 'moment'
import DateVal from './Date'
const windowWidth = Dimensions.get('window').width;

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
import { Feather } from '@expo/vector-icons';

export default function CalendarWeek ({ onSelectDate, selected })  {
  const [dates, setDates] = useState([])
  const [currentMonth, setCurrentMonth] = useState()
  const [currentYear, setCurrentYear] = useState()

  // get the dates from today to 10 days from now, format them as strings and store them in state
  const getDates = () => {
  const date = new Date()
  const monthVal = month[date.getMonth()];
  setCurrentMonth(monthVal)
  const yearVal = date.getFullYear()
  setCurrentYear(yearVal)
  // console.log(date)
  const dayIndex = date.getDay();
  const diffToLastMonday = (dayIndex !== 0) ? dayIndex - 1 : 6;
  const dateOfMonday = new Date(date.setDate(date.getDate() - diffToLastMonday));
  
    const dates = []
    for (let i = 0 ; i < 7; i++) {
      const dateVal = moment(dateOfMonday).add(i,'days');
      //  console.log(dateVal)
      dates.push(dateVal)
    }
    setDates(dates)
  }

  

  useEffect(() => {
    getDates()
  }, [])

  return (
    <>
      <View style={styles.centered}>
      <Feather name="calendar" size={24} color="black" />
        <Text style={styles.title}>{currentMonth} {currentYear}</Text>
      </View>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {dates.map((date, index) => (
              <DateVal
                key={index}
                date={date}
                onSelectDate={onSelectDate}
                selected={selected}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  )
}



const styles = StyleSheet.create({
  centered: {
    
    justifyConten:'center',
    alignItems: 'left',
    marginTop:0,
    flexDirection:'row'
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
  },
  dateSection: {
    width: '100%',
    padding: 0,
    borderWidth:2
  },
  scroll: {
   
  },
})