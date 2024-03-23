import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  SectionList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { WeekCalendar } from "react-native-calendars";
import CalendarWeek from "./CalendarWeek";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { authenticate, db } from "../firebaseConfig";
import { useIsFocused } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import moment from "moment";

var DATA = [
  {
    title: "",
    data: [],
  },
  {
    title: "",
    data: [],
  },
];
var lengthVal = 0
export default function Home({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [userDetails, useUserDetails] = useState({});
  const [userVal, useUserVal] = useState("");
  const auth = authenticate;
  const isFocused = useIsFocused();

  var nextmontVal = moment().month();
  var refid = moment().month(nextmontVal).format("MMMMYYYY");

  // console.log("next sunday", moment().day(7).format("dddd DD"));
  // console.log("next saturday", moment().day(6).format("dddd DD"));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        useUserVal(uid);
        // console.log("user logged in", user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          useUserDetails(docSnap.data());
           console.log("Document data:", docSnap.data().availability);
           lengthVal = docSnap.data().availability.length
        } else {
          console.log("No such document!");
        }
      } else {
        // console.log("user is signedout");
        navigation.navigate("LoginPage");
      }
    });

    const getSche = async () => {
      var prevState = [];
      const docSnap = await getDoc(doc(db, "schedule", refid));
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data().days);
        prevState = docSnap.data().days;
        for (var i = 0; i < prevState.length; i++) {
          if (prevState[i].date == moment().day(6).format("YYYY-MM-DD")) {
            DATA[0].title =
              "Sheduled for  " + moment().day(6).format("dddd DD");
            DATA[0].data = prevState[i].people;
           
          } else if (
            prevState[i].date == moment().day(7).format("YYYY-MM-DD")
          ) {
            DATA[1].title =
              "Sheduled for " + moment().day(7).format("dddd DD");
            DATA[1].data = prevState[i].people;
            // console.log(
            //   "Sheduled for " + moment().day(7).format("dddd DD")
            // );
            // console.log(prevState[i].people);
          }
        }
      }
    };
    getSche();
    return unsubscribe;
  }, [isFocused]);

  return (
    <View style={pageStyle.container}>
      <View style={pageStyle.topSection}>
        <View style={pageStyle.greetAndAvail}>
          <View style={pageStyle.greeting}>
            <Text style={pageStyle.greetText}>Good Day,</Text>
            <Text
              style={[
                pageStyle.greetText,
                { fontSize: 20 },
                { color: "#23C7C7" },
              ]}
            >
              {userDetails.fullname}.
            </Text>
          </View>
          <View style={pageStyle.pressView}>
            {userDetails.email == "Admin@gmail.com" ? (
              <Pressable
                style={pageStyle.pressButton}
                onPress={() => navigation.navigate("Plan")}
              >
                <MaterialCommunityIcons
                  name="google-spreadsheet"
                  size={26}
                  color="black"
                />
                <Text style={pageStyle.pressText}>Schedule sheet</Text>
              </Pressable>
            ) :
            (<Pressable
              style={pageStyle.pressButton}
              onPress={() =>
                navigation.navigate("Availability", {
                  userDetails: userDetails,
                  userId: userVal,
                })
              }
            >
              <MaterialIcons name="add" size={26} color="black" />
              <Text style={pageStyle.pressText}>Add Availability</Text>
            </Pressable>)}
          </View>
        </View>
        { userDetails.email != "Admin@gmail.com" &&( lengthVal <= 0 ? (<Text style={{color:'red'}}> Please indicate your availability for next month</Text>) :
        (<Text style={{color:'green'}}> You have indicated your availability for next month</Text>) )}

        <View style={pageStyle.calen}>
          <CalendarWeek
            onSelectDate={setSelectedDate}
            selected={selectedDate}
          />
        </View>
      </View>

      <View style={pageStyle.section}>
        <ScrollView>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={pageStyle.item}>
              <Text style={pageStyle.title}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ marginVertical: 0 }}>
              <Text style={pageStyle.header}>{title}</Text>
            </View>
          )}
        />
        </ScrollView>
      </View>
      <View
        style={{
          // flex: 0.05,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 0,
        }}
      >
        <Pressable style={pageStyle.logButton} onPress={() => auth.signOut()}>
          <MaterialIcons name="logout" size={24} color="black" />
          <Text style={pageStyle.logText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
  },
  topSection: {
    flex: 0.35,
    borderWidth: 0,
  },
  greetAndAvail: {
    flexDirection: "row",
    borderWidth: 0,
    borderColor: "red",
    justifyContent: "space-between",
  },
  greeting: {
    borderWidth: 0,
    width: "55%",
  },
  greetText: {
    fontSize: 40,
  },
  pressView: {
    width: "45%",
    borderWidth: 0,
    justifyContent: "flex-end",
  },
  pressButton: {
    borderWidth: 2,
    padding: 4,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    backgroundColor: "#FFA15D",
    marginVertical: 2,
  },
  pressText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  calen: {
    borderWidth: 0,
    borderColor: "blue",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  header: {
    marginTop: 10,
    fontSize: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
  },
  section: {
    flex: 0.55,
  },
  sectionList: {
    flex: 0.6,
  },
  logButton: {
    borderWidth: 2,
    padding: 5,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 0,
    flexDirection: "row",
    backgroundColor: "#FF5D5D",
    width: "40%",
  },
  logText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

{
  /* <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Home</Text>
        <Button onPress={()=>auth.signOut()} title="Logout" />
      </View> */
}
