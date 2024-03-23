import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function NumInput({count,onChangeCount}) {
  
const setVal=(val)=>{

    if(val == "Sub"){
        var numVal = count <= 0 ? 0 : parseInt(count) - 1 
        onChangeCount(numVal)
    }
}


  return (
    <View style={pageStyle.container}>
      <View style={pageStyle.input}>
        <TouchableOpacity
          onPress={() => setVal("Sub")}
          style={{
            // backgroundColor: "blue",
            width: "20%",
            height: "100%",
            justifyContent:'center',
            alignItems:'center',
            borderRightWidth:2
          }}
        >
          <Text style={{ color: "black", fontSize: 20 }}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={{ borderColor: "black", height: "100%" , fontSize: 20,width:"60%", paddingLeft:10}}
          placeholder="Amount"
          value={count}
          onChangeText={onChangeCount}
          keyboardType="numeric"
        />
        <TouchableOpacity
          onPress={() => onChangeCount(parseInt(count) + 1)}
          style={{
            // backgroundColor: "blue",
            width: "20%",
            height: "100%",
            justifyContent:'center',
            alignItems:'center',
            borderLeftWidth:2
          }}
        >
          <Text style={{ color: "black", fontSize: 20 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 40,
    width: "50%",
    margin: 12,
    borderWidth: 2,
    borderRadius: 10,
    padding: 0,
    backgroundColor: "#F4CE14",
    
  },
});
