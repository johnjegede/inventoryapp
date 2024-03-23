import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import PageHeading from "../components/PageHeading";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { query, collection, onSnapshot, getDocs,doc,deleteDoc, } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { useIsFocused } from "@react-navigation/native";
import { getStorage, ref, uploadBytes, getDownloadURL,deleteObject } from "firebase/storage";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
];



export default function Inventory({ navigation }) {
  const [selectedId, setSelectedId] = useState();
  const [deleted, setDeleted] = useState(false); 
  const [loading, setLoading] = useState(false); // Set loading to true on component mount
  const [listStock, setListStock] = useState([]);
  const [listInStock, setListInStock] = useState([]);
  const [listOutStock, setListOutStock] = useState([]);
  const [istock, setIstock] = useState(true);
  const [ostock, setOstock] = useState(false);
  const [bgColor, setBgColor] = useState('green');
  const [searchItem, onChangeSearchItem] = useState("");
  const [filterData,setfilterData] = useState([]);
  const isFocused = useIsFocused();
  //   console.log(searchItem)
  const deleteDocu = async (itemData)=>{
    // console.log("delete",itemData)
    await deleteDoc(doc(db, 'stock', itemData.id));
    // const storage = getStorage();
    const deleteRef = ref(storage, itemData.imageName);
    console.log(deleteRef)
      await deleteObject(deleteRef).then(() => {
        // File deleted successfully
      }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error)
      });
  
      setDeleted(true)
      // navigation.navigate('Inventory');
  }
  
  const changeVal = () => {
    console.log("Cancel Pressed");
  };
  
  const changeOk = (item) => {
    console.log("Ok Pressed");
    deleteDocu(item)
  };
  
  const createTwoButtonAlert = (item) => {
    Alert.alert("You are deleting an item", "Do you want to delete it", [
      {
        text: "Cancel",
        onPress: changeVal,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: changeOk(item),
      },
    ]);
  };
  
  const windowsAlert = (item) =>{
    // console.log(item)
    const delValu = confirm("Do you want to delete an item");
    if (delValu == true) {
        alert("You pressed OK!");
        deleteDocu(item)
    }
    else {
        alert("You pressed Cancel!");
    }
  }
  

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
    setDeleted(false)

  }, [isFocused,deleted]);

useEffect (() => {
  // console.log(searchItem)
  if(searchItem) {
    const newData = listStock.filter((item) => {
      const itemData = item.itemName.toLowerCase()
      const textData = searchItem.toLowerCase()
      return itemData.indexOf(textData) > -1
    })
    setfilterData(newData) 
  }else {
    setfilterData("")
  }
  // console.log("filterdata",filterData)

},[searchItem])


// const changeSearchitem =(data)=>{
//   setSearchItem(data)

// }
  // console.log("instock = ", listInStock);
  // console.log("outstock = ", listOutStock);
  // console.log(listStock)

  const Item = ({ item, onPress, del }) => (
    <TouchableOpacity
      onPress={onPress}
      style={pageStyle.item}  //set backgroud color
    >
      <View style={pageStyle.thumb}>
        <Image source={{ uri: item.imageSrc }} style={pageStyle.imageStyle} />
      </View>
      <View style={pageStyle.thumbtext}>
        <Text style={pageStyle.title} // set text color
        >   
          {item.itemName}
        </Text>
        <View style={pageStyle.thumbicon}>
          <Ionicons name="add-circle-outline" size={34} color="black" />
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}
          >
            {item.itemAmount}
          </Text>
          <Pressable onPress={()=>del(item)}>
            <MaterialIcons name="delete-forever" size={34} color="black" />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );


  const renderItem = ({ item }) => {
    const backgroundColor =  "#f9c2ff";
    const color = "black";

    return (
      <Item
        item={item}
        onPress={() => navigation.navigate("DisplayItem", { itemData: item })}
        backgroundColor={backgroundColor}
        textColor={color}
        del={Platform.OS === "ios" ? createTwoButtonAlert : windowsAlert}
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
      <PageHeading edit={false} searchItem={searchItem} setSearchItem={onChangeSearchItem} search={true} />

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
            data={filterData.length != 0 ? filterData : istock ? listInStock : listOutStock} //listStock  istock ? listInStock : listOutStock
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        )}
      </View>
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    height:"90%"
    // paddingBottom:60,
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
