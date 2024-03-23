import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Table, Row, Rows, Col } from "react-native-table-component";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { authenticate, db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  queryEqual,
  updateDoc,
  doc,
  query,
  where,
  getDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";

const borderColor = "#C1C0B9";
const primaryColor = "dodgerblue";
const backgroundColor = "#F7F6E7";

const leftColumnWidth = 100;
const headerHeight = 40;

const Present = ({
  row,
  col,
  setRowDay,
  setRemove,
  setColName,
  tableCol,
  tableRow,
  prvVal,
}) => {
  // console.log("prvVal", prvVal);
  const [clicked, setClicked] = useState(prvVal);
  useEffect(() => {
    setClicked(prvVal);
  }, [prvVal]);

  const clickedme = () => {
    setClicked(!clicked);
    if (clicked) {
      setRowDay(tableRow[row]);
      setColName(tableCol[col]);
      setRemove(true);
    } else {
      setRowDay(tableRow[row]);
      setColName(tableCol[col]);
      setRemove(false);
      // prvVal = false
    }
    // console.log("row",tableRow[row])
    // console.log('coloumn',tableHead[col])
  };
  return (
    <Pressable style={pageStyle.stylePress} onPress={() => clickedme()}>
      {clicked ? (
        <FontAwesome name="check" size={20} color="green" />
      ) : (
        <FontAwesome name="close" size={20} color="black" />
      )}
    </Pressable>
  );
};

const RowView = ({ val }) => {
  let day = moment(val).format("dddd D");
  return (
    <View style={pageStyle.rowView}>
      <Text>{day}</Text>
    </View>
  );
};

const ColView = ({ name, setSelName }) => {
  return (
    <TouchableOpacity
      style={pageStyle.colView}
      onPress={() => setSelName(name)}
    >
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

export default function Plan({ navigation }) {
  const leftRef = useRef(ScrollView);
  const [selName, setSelName] = useState("");
  const [rowDay, setRowDay] = useState("");
  const [colName, setColName] = useState("");
  const [remove, setRemove] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [tableCols, setTableCols] = useState([]);
  const [schduledays, setSchduledays] = useState([{ date: "", people: [] }]);
  const [teamschdules, setTeamschdules] = useState([{ person: "", dates: [] }]);
  const [available, setAvailable] = useState({});
  const [preStateVal, setPreStateVal] = useState([]);

  var nextmontVal = moment().month() + 1;
  var refid = moment().month(nextmontVal).format("MMMMYYYY");
  let dateVal = moment().month(nextmontVal).startOf("month");
  // console.log(dateVal);
  const daysInMonth = dateVal.daysInMonth();
  // console.log("days in month", daysInMonth);

  useEffect(() => {
    let tableRow = [];
    for (let j = 0; j < daysInMonth; j++) {
      if (
        moment(dateVal).add(j, "days").day() == 6 ||
        moment(dateVal).add(j, "days").day() == 0
      ) {
        let datevalll = moment(dateVal).add(j, "days").format("YYYY-MM-DD");
        //  console.log('day 1',datevalll)
        tableRow.push(datevalll);
      }
    }

    let tableCol = [];
    let availy = {};
    const getEveryOne = async () => {
      const queryDB = await getDocs(collection(db, "users"));

      queryDB.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().fullname}`);
        if (doc.data().fullname !== "Admin") {
          tableCol.push(doc.data().fullname);
          availy[doc.data().fullname] = doc.data().availability;
        }
      });
      tableCol = tableCol.sort();
      var teamschdule = tableCol.map((person, index) => {
        // console.log(date)
        return { person: person, dates: [] };
      });
      // console.log("teamschdule", teamschdule);
      setTeamschdules(teamschdule);
      setAvailable(availy);
    };

    getEveryOne();
    // sleep(1000);

    // setTimeout(async function () {
    //   await getEveryOne();
    // }, 1000);

    setTableCols(tableCol);
    setTableRows(tableRow);

    var schduleday = tableRow.map((date, index) => {
      // console.log(date)
      return { date: date, people: [] };
    });
    setSchduledays(schduleday);

    // getPrvState();
    // setTimeout(async function () {
    //   await getPrvState();
    // }, 1000);
  }, []);

  const getPrvState = async () => {
    var preStateArray = [];
    var prevState = [];
    const docSnap = await getDoc(doc(db, "schedule", refid));
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data().days);
      prevState = docSnap.data().days;
    }
    const querySnapshot = await getDocs(collection(db, "users"));
    var i = 0;
    querySnapshot.forEach((docu) => {
      if (docu.data().fullname != "Admin") {
        teamschdules[i].dates = docu.data().schedule;
        teamschdules[i].person = docu.data().fullname;
        // console.log("teamschduleval", teamschdules[i]);
        i++;
      }
    });
    teamschdules.sort((a, b) => a.person > b.person ? 1 : -1);

    preStateArray = Array.from(Array(tableRows.length), () =>
      new Array(tableCols.length).fill(false)
    );
    console.log(
      "preStateArray1",
      preStateArray,
      "row",
      tableRows.length,
      "col",
      tableCols.length
    );
    for (var i = 0; i < tableRows.length; i++) {
      let rownum = tableRows.indexOf(prevState[i].date);
      schduledays[i].date = prevState[i].date;
      schduledays[i].people = prevState[i].people;

      for (var j = 0; j < prevState[i].people.length; j++) {
        let colnum = tableCols.indexOf(prevState[i].people[j]);
        preStateArray[rownum][colnum] = true;
      }
    }
    // console.log("preStateArray",preStateArray)
    setPreStateVal(preStateArray);
    // setSchduledays(schduledays);
    // setTeamschdules(teamschdules);
  };

  // sleep(1000);
  const onSaveVal = async () => {
    const personRef = collection(db, "users");
    console.log("doc", doc(personRef));

    for (let i = 0; i < teamschdules.length; i++) {
      const persone = query(
        personRef,
        where("fullname", "==", teamschdules[i].person)
      );

      const getPerson = await getDocs(persone);
      console.log("getPerson", getPerson);
      getPerson.forEach(async (docu) => {
        console.log(docu.id, " => ", docu.data());
        const pRef = doc(db, "users", docu.id);
        await updateDoc(pRef, {
          schedule: teamschdules[i].dates,
        });
      });
    }

    try {
      const docRef = await setDoc(doc(db, "schedule", refid), {
        days: schduledays,
      });

      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // navigation.navigate("Home");
  };

  // console.log("row", rowDay);
  // console.log("coloumn", colName);

  let rowObj = tableRows.indexOf(rowDay);
  if (rowObj > -1 && remove == true) {
    let colObj = schduledays[rowObj].people.indexOf(colName);
    if (colObj > -1) {
      schduledays[rowObj].people.splice(colObj, 1);
    }
  } else if (rowObj > -1 && remove == false) {
    schduledays[rowObj].people.push(colName);
  }
  // console.log("row", rowDay);
  // console.log("coloumn", colName);
  let rowPer = tableCols.indexOf(colName);
  if (rowPer > -1 && remove == true) {
    let colPer = teamschdules[rowPer].dates.indexOf(rowDay);
    if (colPer > -1) {
      teamschdules[rowPer].dates.splice(colPer, 1);
    }
    setRowDay("");
    setColName("");
  } else if (rowPer > -1 && remove == false) {
    teamschdules[rowPer].dates.push(rowDay);
    setRowDay("");
    setColName("");
  }

  // setRowDay("");
  // setColName("");
  console.log("schduledays", schduledays);
  console.log("teamschdules", teamschdules);

  const colVal = [];
  for (let k = 0; k < tableCols.length; k++) {
    colVal.push(<ColView name={tableCols[k]} setSelName={setSelName} />);
  }

  const rowVal = [];
  for (let k = 0; k < tableRows.length; k++) {
    rowVal.push(<RowView val={tableRows[k]} />);
  }
  // var valpass = Array.from(Array(tableRows.length), () => new Array(tableCols.length).fill(0));

  // const valpass = [];
  // for (let i = 0; i < tableRows.length; i++) {
  //   const rowin = [];
  //   for (let j = 0; j < tableCols.length; j++) {
  //     rowin.push(2);
  //   }
  //   valpass.push(rowin);
  // }
  //  valpass[0][0] = 1;
  // console.log("valpass", valpass[0][0]);
  // console.log("valpass[2]", valpass[0][2]);
  // var val2 = valpass[0][2]
  // console.log("var2",val2)
  let setValpass = false;

  const tableData = [];
  for (let i = 0; i < tableRows.length; i++) {
    const rowData = [];
    for (let j = 0; j < tableCols.length; j++) {
      // let setValpass = valpass[i][j] == 1 ? true : false;
      setValpass = preStateVal.length !== 0 ? preStateVal[i][j] : false;
      // console.log("setValpass", setValpass);
      rowData.push(
        <Present
          row={i}
          col={j}
          setRowDay={setRowDay}
          setRemove={setRemove}
          setColName={setColName}
          tableRow={tableRows}
          tableCol={tableCols}
          prvVal={setValpass}
        />
      );
    }
    tableData.push(rowData);
  }

  // console.log("selName",selName)
  // console.log("slot",avail[selName])
  // sleep(1000);
  return (
    <View style={pageStyle.container}>
      <ScrollView>
      <View style={{ height:"15%", borderWidth: 2 }}>
        <Text>{selName}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {available[selName] &&
            available[selName].map((day, index) => {
              return (
                <View
                  key={index}
                  style={{
                    paddingHorizontal: 5,
                    borderWidth: 2,
                    marginHorizontal: 1,
                    borderRadius: 5,
                    width: "30%",
                  }}
                >
                  <Text>{moment(day).format("dddd D")}</Text>
                </View>
              );
            })}
        </View>
      </View>

      <View style={pageStyle.planCon}>
        <View style={pageStyle.leftColumn}>
          <View style={pageStyle.leftBlankCell}>
            <Text>Month</Text>
          </View>
          <ScrollView
            style={pageStyle.leftscroll}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            ref={leftRef}
          >
            <Table borderStyle={pageStyle.leftTable}>
              <Col
                data={rowVal}
                style={pageStyle.title}
                // textStyle={pageStyle.text}
              />
            </Table>
          </ScrollView>
        </View>

        <View style={pageStyle.rightColumn}>
          <ScrollView
            horizontal={true}
            bounces={false}
            scrollEventThrottle={16}
            onScroll={(e) => {
              const { y } = e.nativeEvent.contentOffset;
              leftRef.current.scrollTo({ y, animated: false });
            }}
          >
            <Table borderStyle={pageStyle.rightHeader}>
              <Row
                data={colVal}
                style={pageStyle.head}
                // textStyle={pageStyle.text}
              />
              {tableData.map((rowData, index) => {
                return <Row data={rowData} key={index} />;
              })}
            </Table>
          </ScrollView>
        </View>
      </View>

      <View style={{ borderWidth: 2,  }}>
        <ScrollView>
          {schduledays.map((data, index) => {
            return (
              <View
                key={index}
                style={{ flexDirection: "row", flexWrap: "wrap" }}
              >
                <Text>{moment(data.date).format("dddd D")} : </Text>
                <View style={{ flexWrap: "wrap" }}>
                  {data.people.map((day, index) => (
                    <Text key={index}>{day}</Text>
                  ))}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Pressable style={pageStyle.saveButton} onPress={() => onSaveVal()}>
          <Text style={pageStyle.saveText}>Save</Text>
        </Pressable>
        <Pressable style={pageStyle.saveButton} onPress={() => getPrvState()}>
          <Text style={pageStyle.saveText}>Edit Previous</Text>
        </Pressable>
      </View>
      </ScrollView>
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 0.9,
  },
  planCon: {
    borderWidth: 2,
    flexDirection: "row",
    backgroundColor: "#eee",
    marginTop: 10,
    marginLeft: 0,
  },
  leftColumn: {
    borderWidth: 0,
    width: leftColumnWidth,
    backgroundColor: "yellow",
    borderRightWidth: 1,
    borderRightColor: borderColor,
    borderColor: "red",
  },
  leftscroll: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 0,
    height: 0,
  },
  leftBlankCell: {
    height: headerHeight,
    backgroundColor: primaryColor,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    borderWidth: 0,
  },
  leftTable: {
    borderWidth: 1,
    borderColor,
  },
  title: { backgroundColor: "#f6f8fa" },
  text: { textAlign: "center" },
  rightColumn: { flex: 1, backgroundColor: "white", borderWidth: 0 },
  rightHeader: { borderWidth: 1, borderColor },
  head: { height: 40, backgroundColor: primaryColor },
  stylePress: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 80,
  },
  rowView: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  colView: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 80,
  },
  saveButton: {
    borderWidth: 0,
    // alignItems: "center",
    // justifyContent: "space-evenly",
    width: "40%",
    marginHorizontal: 10,
  },
  saveText: {
    borderWidth: 2,
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "#FF5D5D",
    textAlign: "center",
    // width: "40%",
    borderRadius: 25,
    padding: 5,
  },
});
