import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  FlatList,
} from "react-native";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

const MainDate = ({
  date,
  month,
  year,
  singleSelect,
  onSelectedDate,
  setOnSelectedDate,
  serveDate,
  setServeDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(false);

  const thisDate = moment()
    .month(month)
    .date(date)
    .year(year)
    .format("YYYY-MM-DD");
  const todays = moment().format("YYYY-MM-DD");
  // console.log('thisDate', thisDate, 'todays',todays)
  // onSelectedDate === thisDate && {backgroundColor:'blue'}

  const selVal = () => {
    if (singleSelect) {
      setSelectedDate(false);
      setOnSelectedDate(thisDate);
      setServeDate([]);
      setServeDate((oldserveDate) => [...oldserveDate, thisDate]);
    } else {
      const getDay = moment().month(month).date(date).day();
      if (getDay === 6 || getDay === 0) {
        setSelectedDate(!selectedDate);
      }

      //  console.log("serveDate",serveDate)
      //  console.log("selectedDate",selectedDate)
      if (!selectedDate) {
        // console.log("thisdate",moment().month(month).date(date).day())
        if (getDay === 6 || getDay === 0) {
          // serveDateVal.push(thisDate)
          setServeDate((oldserveDate) => [...oldserveDate, thisDate]);
        }
      } else {
        const index = serveDate.indexOf(thisDate);
        if (index > -1) {
          // serveDate.splice(index,1)
          setServeDate(serveDate.filter((item) => item !== thisDate));
        }
      }
    }
  };

  return (
    <View>
      {date != -1 ? (
        <TouchableOpacity style={pageStyle.card} onPress={selVal}>
          <View
            style={[
              pageStyle.daynum,
              selectedDate === true && { backgroundColor: "#E58E13" },
              todays === thisDate && { backgroundColor: "green" },
              onSelectedDate === thisDate && { backgroundColor: "#E58E13" },
            ]}
          >
            {
              <Text
                style={[
                  pageStyle.medium,
                  selectedDate === true || onSelectedDate === thisDate  && {
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 24,
                  },
                ]}
              >
                {date}
              </Text>
            }
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={pageStyle.card}></TouchableOpacity>
      )}
    </View>
  );
};

export default function Calendar({
  arrows,
  nextMonth,
  singleSelect,
  serveDate = null,
  setServeDate = null,
}) {
  //  arrows =false;
  //  nextMonth = true;
  //  singleSelect = false

  const [onSelectedDate, setOnSelectedDate] = useState(null);
  //  const [calend, setCalend] = useState([])

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [currDate, setCurrDate] = useState(moment());

  var incMonth = 0;
  if (nextMonth) {
    incMonth += 1;
  }
  // let currDate = moment()
  const currMonth = moment(currDate).month();
  // console.log("currMonth",currMonth)

  var month = moment(currDate)
    .month(currMonth + incMonth)
    .month();
  // console.log('month',months[month])

  var year = moment(currDate)
    .month(currMonth + incMonth)
    .year();
  // console.log('year', year)

  const changeMonthVal = (val) => {
    // console.log(moment(currDate).month(currMonth + val))
    setCurrDate(moment(currDate).month(currMonth + val));
  };

  const genCalendar = () => {
    var calMatrix = [];
    calMatrix[0] = weekDays;

    var firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay !== 0 ? firstDay - 1 : 6;
    // console.log('firstDay', weekDays[firstDay] )

    var maxDays = moment().month(month).daysInMonth();
    // console.log('maxDays',maxDays)

    var counter = 1;
    for (var row = 1; row < 7; row++) {
      calMatrix[row] = [];
      for (var col = 0; col < 7; col++) {
        calMatrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          calMatrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          calMatrix[row][col] = counter++;
        }
      }
      if (counter > maxDays) {
        break;
      }
    }
    return calMatrix;
  };

  var calend = genCalendar();

  return (
    <View style={pageStyle.container}>
      <View style={pageStyle.calenval}>
        <View style={pageStyle.calarrow}>
          {arrows && (
            <Pressable onPress={() => changeMonthVal(-1)}>
              {Platform.OS === "web" ? (
                <Text>Previous</Text>
              ) : (
                <FontAwesome
                  name="chevron-circle-left"
                  size={30}
                  color="black"
                />
              )}
            </Pressable>
          )}
          <View style={pageStyle.calMonth}>
            {Platform.OS === "web" ? (
              ""
            ) : (
              <FontAwesome name="calendar-o" size={30} color="black" />
            )}
            <Text style={pageStyle.disMonth}>{months[month]}</Text>
            <Text style={[pageStyle.disMonth, { padding: 0 }]}>{year}</Text>
          </View>
          {arrows && (
            <Pressable onPress={() => changeMonthVal(+1)}>
              {Platform.OS === "web" ? (
                <Text>Next</Text>
              ) : (
                <FontAwesome
                  name="chevron-circle-right"
                  size={30}
                  color="black"
                />
              )}
            </Pressable>
          )}
        </View>
        {calend.map((row, rowIndex) => {
          var rowItems = row.map((date, dayIndex) => {
            return (
              <View key={dayIndex}>
                {(rowIndex === 0) ? (
                  <View style={pageStyle.weekD} >
                    <Text
                      style={[
                        pageStyle.big,
                        date == "Sat" && { color: "blue" },
                        date == "Sun" && { color: "red" },
                      ]}
                    >
                      {date}
                    </Text>
                  </View>
                ) : (
                  <MainDate
                    key={dayIndex}
                    date={date}
                    month={month}
                    year={year}
                    singleSelect={singleSelect}
                    onSelectedDate={onSelectedDate}
                    setOnSelectedDate={setOnSelectedDate}
                    serveDate={serveDate}
                    setServeDate={setServeDate}
                  />
                )}
              </View>
            );
          });
          return (
            <View key={rowIndex} style={pageStyle.scroll}>
              <View  style={pageStyle.dateSection}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {rowItems}
                </ScrollView>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 0.5,
    marginTop: 0,
    borderWidth: 0,
  },
  calenval: {
    borderWidth: 2,
    borderRadius: 10,
    margin: 2,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#000",
    padding: 2,
    marginVertical: 0,
    alignItems: "center",
    // height: 90,
    width: windowWidth / 7,
    marginHorizontal: 0,
    borderWidth: 0,
  },
  big: {
    fontWeight: "400",
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  medium: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  daynum: {
    borderWidth: 0,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  dateSection: {
    width: "100%",
    padding: 0,
    borderWidth: 0,
  },
  scroll: {},
  weekD: {
    width: windowWidth / 7,
  },
  calMonth: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "55%",
    marginHorizontal: 35,
  },
  disMonth: {
    padding: 5,
    fontSize: 30,
  },
  calarrow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 10,
  },
});
