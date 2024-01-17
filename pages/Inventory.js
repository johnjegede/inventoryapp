import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import PageHeading from "../components/PageHeading";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { query, collection, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useIsFocused } from "@react-navigation/native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
];

export default function Inventory({ navigation }) {
  const [selectedId, setSelectedId] = useState();
  const [loading, setLoading] = useState(false); // Set loading to true on component mount
  const [listStock, setListStock] = useState([]);
  const [listInStock, setListInStock] = useState([]);
  const [listOutStock, setListOutStock] = useState([]);
  const [istock, setIstock] = useState(true);
  const [ostock, setOstock] = useState(false);
  const [bgColor, setBgColor] = useState('green');
  let delVal = false;
  const isFocused = useIsFocused();
  //   console.log(isFocused)

  useEffect(() => {
    let listStockArr = [];
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "stock"));
      querySnapshot.forEach((doc) => {
        listStockArr.push({ ...doc.data(), id: doc.id });
        //  console.log(`${doc.id} => ${doc.data()}`);
      });
      setListStock(listStockArr);
      // console.log(listStock)
      const listinStock = listStockArr.filter(
        (value) => parseInt(value.itemAmount) > 0
      );
      setListInStock(listinStock);

      const listoutStock = listStockArr.filter(
        (value) => parseInt(value.itemAmount) <= 0
      );
      setListOutStock(listoutStock);
    }
    isFocused && getData();
    setLoading(true);
  }, [isFocused]);

  // console.log("instock = ", listInStock);
  // console.log("outstock = ", listOutStock);
  // console.log(listStock)

  const Item = ({ item, onPress, backgroundColor, textColor, del }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[pageStyle.item, { backgroundColor }]}
    >
      <View style={pageStyle.thumb}>
        <Image source={{ uri: item.imageSrc }} style={pageStyle.imageStyle} />
      </View>
      <View style={pageStyle.thumbtext}>
        <Text style={[pageStyle.title, { color: textColor }]}>
          {item.itemName}
        </Text>
        <View style={pageStyle.thumbicon}>
          <Ionicons name="add-circle-outline" size={34} color="black" />
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}
          >
            {item.itemAmount}
          </Text>
          <Pressable onPress={del}>
            <MaterialIcons name="delete-forever" size={34} color="black" />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );

  const createTwoButtonAlert = () =>
    Alert.alert("You are deleting an item", "Do you want to delet it", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel Pressed");
          delVal = false;
          console.log(delVal);
        },
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          delVal = true;
          console.log("OK Presse");
          console.log(delVal);
        },
      },
    ]);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => navigation.navigate("DisplayItem", { itemData: item })}
        backgroundColor={backgroundColor}
        textColor={color}
        del={createTwoButtonAlert}
      />
    );
  };

  const ipressFunction = () => {
    if (istock == false) {
      setIstock(!istock);
      setOstock(false);
      setBgColor('green')
    }
  };

  const opressFunction = () => {
    if (ostock == false) {
      setOstock(!ostock);
      setIstock(false);
      setBgColor('red')
    }
  };
  return (
    <View style={pageStyle.container}>
      <PageHeading search={true} />

      <View style={pageStyle.view}>
        <View style={pageStyle.buttons}>
          <Pressable
            onPress={ipressFunction}
            style={[
              pageStyle.text,
              istock ? pageStyle.press : pageStyle.unpress,
            ]}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              In Stock
            </Text>
          </Pressable>
          <Pressable
            onPress={opressFunction}
            style={[
              pageStyle.text,
              ostock ? pageStyle.press : pageStyle.unpress,
            ]}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Out of Stock
            </Text>
          </Pressable>
        </View>
        <View style={[pageStyle.textNum, {backgroundColor:bgColor}]}>
          <Text style={[pageStyle.textNumItem, {backgroundColor:bgColor}]}>{istock ? listInStock.length : listOutStock.length}</Text>
        </View>
      </View>
      <View style={pageStyle.flatlist}>
        {loading && (
          <FlatList
            data={istock ? listInStock : listOutStock} //listStock  istock ? listInStock : listOutStock
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
    height: "6%",
  },
  buttons: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  text: {
    width: "50%",
    padding: 6,
    marginLeft: 0,
    height: "100%",
    justifyContent: "center",
  },
  press: {
    borderRadius: 5,
    backgroundColor: "white",
  },
  unpress: {
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
  },
  textNum: {
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    width: "10%",
    marginHorizontal: 10,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 2,
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
  },
  flatlist: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
  },
  thumb: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 10,
  },
  thumbtext: {
    borderWidth: 0,
    marginHorizontal: 5,
    width: "70%",
    justifyContent: "space-between",
  },
  thumbicon: {
    flexDirection: "row",
    borderWidth: 0,
    justifyContent: "space-between",
    paddingRight: 10,
    alignItems: "center",
  },
  imageStyle: {
    resizeMode: "cover",
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  textNumItem:{
    textAlign: "center", fontWeight: "bold" , color:'white',
  }
});

// useEffect ( () => {
//  const unsubscribe = navigation.addListener('focus', ()=> {
//     let listStockArr = []
//     async function getData() {
//     const querySnapshot = await getDocs(collection(db, "stock"));
//     querySnapshot.forEach((doc) => {
//         listStockArr.push({...doc.data(), id: doc.id})
//       console.log(`${doc.id} => ${doc.data()}`);
//     });
//     setListStock(listStockArr)
//     // console.log(listStock)
// }
//   getData()
// setLoading(true)
// })
// return unsubscribe
// }, [navigation])
