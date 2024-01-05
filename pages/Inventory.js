import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import PageHeading from "../components/PageHeading";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[pageStyle.item, { backgroundColor }]}
  >
    <View style={pageStyle.thumb}>
      <Image />
    </View>
    <View style={pageStyle.thumbtext}>
      <Text style={[pageStyle.title, { color: textColor }]}>{item.title}</Text>
      <View style={pageStyle.thumbicon}>
        <Ionicons name="add-circle-outline" size={34} color="black" />
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}>
          2
        </Text>
        <MaterialIcons name="delete-forever" size={34} color="black" />
      </View>
    </View>
  </TouchableOpacity>
);

export default function Inventory() {
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const [istock, setIstock] = useState(true);
  const [ostock, setOstock] = useState(false);

  const ipressFunction = () => {
    if (istock == false) {
      setIstock(!istock);
      setOstock(false);
    }
  };

  const opressFunction = () => {
    if (ostock == false) {
      setOstock(!ostock);
      setIstock(false);
    }
  };
  return (
    <View style={pageStyle.container}>
      <PageHeading name="Inventory" search={true} />

      <View style={pageStyle.view}>
        <View style={pageStyle.buttons}>
          <Pressable
            onPress={ipressFunction}
            style={[pageStyle.press, istock ? pageStyle.text : ""]}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              In Stock
            </Text>
          </Pressable>
          <Pressable
            onPress={opressFunction}
            style={[pageStyle.press, ostock ? pageStyle.text : ""]}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Out of Stock
            </Text>
          </Pressable>
        </View>
        <View style={pageStyle.textNum}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>18</Text>
        </View>
      </View>
      <View style={pageStyle.flatlist}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
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
    height: "4%",
  },
  buttons: {
    borderWidth: 1,
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 0.5,
    backgroundColor: "#E0E0E0",
  },
  text: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
  },
  press: {
    width: "50%",
    padding: 4,
    marginLeft: 0,
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
});
