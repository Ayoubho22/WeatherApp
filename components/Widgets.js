import React, { useState } from 'react';
import { ScrollView, View, Image } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Switch,
  ActivityIndicator,
  Card,
  IconButton,
  Avatar,
  Modal,
  Portal,
  Provider,
  RadioButton,
  Checkbox,
  List,
  Divider,
} from 'react-native-paper';

export default function App() {
  const [text, setText] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('first');
  const [visible, setVisible] = useState(false);

  return (
    <Provider>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
          📱  Widgets
        </Text>

        <TextInput
          label="Enter Text"
          value={text}
          onChangeText={text => setText(text)}
          mode="outlined"
        />

        <View style={{ marginVertical: 10 }}>
          <Button mode="contained" onPress={() => console.log("Button pressed!")}>
            Get Input
          </Button>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <Text>Toggle Switch</Text>
          <Switch value={isSwitchOn} onValueChange={() => setIsSwitchOn(!isSwitchOn)} />
        </View>

        <ActivityIndicator animating={true} color="#6200ee" />

        <Card style={{ marginVertical: 10 }}>
          <Card.Title
            title="GPU details "
            subtitle="Card Component"
            left={props => <Avatar.Image {...props} source={{       uri: 'https://www.weka.io/wp-content/uploads/files/2023/07/blog-gpu-achieving-groundbreaking-productivity-with-gpus.jpg',
            }} />}
          />
          <Card.Content>
            <Text variant="bodyMedium">This is a card with image and text.</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => console.log("Card button")}>click to dive</Button>
          </Card.Actions>
        </Card>

        <IconButton
          icon="camera"
          iconColor="#6200ee"
          size={30}
          onPress={() => console.log("Icon Pressed")}
        />

        <RadioButton.Group onValueChange={value => setRadioValue(value)} value={radioValue}>
          <View>
            <RadioButton.Item label="First option" value="first" />
            <RadioButton.Item label="Second option" value="second" />
          </View>
        </RadioButton.Group>

        <Checkbox.Item
          label="I agree"
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />

        <List.Section title=" List ">
          <List.Accordion title="Expand" left={props => <List.Icon {...props} icon="folder" />}>
            <List.Item title="option 1" />
            <List.Item title="option 2" />
          </List.Accordion>
        </List.Section>

        <Divider style={{ marginVertical: 10 }} />

        <Button mode="outlined" onPress={() => setVisible(true)}>
          Show Modal
        </Button>

        <Portal>
          <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10 }}>
            <Text>A pop up !</Text>
            <Button onPress={() => setVisible(false)}>Close</Button>
          </Modal>
        </Portal>
      </ScrollView>
    </Provider>
  );
}
