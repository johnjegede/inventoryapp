import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import moment from "moment";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export default function DateVal({ date, onSelectDate, selected }) {
  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   */
  // const day = moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? 'Today' : moment(date).format('ddd')
  const day = moment(date).format("ddd");
  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format("D");
  // console.log("day number",dayNumber)
  const today =
    moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD");

  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format("YYYY-MM-DD");
  //  console.log("full day",fullDate)
  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[styles.card, today && { backgroundColor: "#E58E13" }]}
    >
      <Text
        style={[
          styles.big,
          day === "Sat" && { color: "blue" },
          day === "Sun" && { color: "red" },
        ]}
      >
        {day}
      </Text>
      <View style={{ height: 20 }} />
      <View style={[styles.daynum, today && { backgroundColor: "#E58E13" }]}>
        <Text
          style={[
            styles.medium,
            day === "Sat" && { color: "blue", fontSize: 24 },
            day === "Sun" && { color: "red", fontSize: 24 },
          ]}
        >
          {dayNumber}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 16,
  },
  medium: {
    fontSize: 16,
    textAlign: "center",
  },
  daynum: {
    borderWidth: 2,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
});

// selected === fullDate && { backgroundColor: "#6146c6" }
// selected === fullDate && { color: "#fff" }
// selected === fullDate && { color: "#ffc", fontWeight: 'bold', fontSize: 24 }
