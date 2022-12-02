#include <SimpleDHT.h>
#include <WiFi.h>  
#include <FirebaseESP32.h>
#include <ESP32Servo.h>

#define pinDHT11 4
#define buzzer 2
#define sensor 34//MQ5
#define led 12
#define led1 14
#define led2 13


#define WIFI_SSID "Paul Nguyen" //Tên WiFi
#define WIFI_PASSWORD "12345678" //Password 

#define FIREBASE_HOST "https://esp32-af5ad-default-rtdb.asia-southeast1.firebasedatabase.app/"
#define FIREBASE_AUTH "mePBz5UT5riyvjS2s0WPtjWB0zVMoysQudFIOQTL"

FirebaseData fbdb;

SimpleDHT11 dht11(pinDHT11);
byte temp=0, hum=0;
int rainSensor = 5;                
int gas_value, value; 
static const int servoPin = 18;
Servo servo;

void setup(){
  // put your setup code here, to run once:
  pinMode(sensor, INPUT);
  pinMode(buzzer, OUTPUT);
  pinMode(rainSensor,INPUT);
  pinMode(led, OUTPUT);  
  pinMode(led1, OUTPUT); 
  pinMode(led2, OUTPUT); 
  Serial.begin(9600);
  servo.attach(servoPin);
  delay(500);
  //connect to wifi
  WiFi.begin (WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println ("");
  Serial.println ("Connected Succerfully with IP:");
  Serial.println(WiFi.localIP()); //WiFi.localIP() this command to get IP 
  Serial.println();
  //connect to firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop(){
  gas_value = analogRead(sensor);//Đọc tín hiệu tử cảm biến khí gas
  value = digitalRead(rainSensor);//Đọc tín hiệu cảm biến mưa
  datadht11();
  datagassensor();
  datarainsensor();
  senddatafirebase();
  controlled();
  controlled1();
  controlled2();
  controlspeaker();
  controlservo();
 Serial.print("Gas Sensor Value:");
 Serial.println(gas_value);
 delay(200);
 Serial.print("Rain Sensor:");
 Serial.println(value);
 delay(200);
}

void datadht11(){
  if(dht11.read(&temp, &hum, NULL) != SimpleDHTErrSuccess){
  Serial.println("Read DHT Failed.");
 }
 else{
  Serial.print("Temperature: ");
  Serial.println(temp);
  Serial.print("Humidity: ");
  Serial.println(hum); 
  delay(200);
  }
}
void datagassensor(){
  if (gas_value > 1000 ) {
    digitalWrite(buzzer, HIGH);
    delay(500);
    digitalWrite(buzzer, LOW);
    delay(500);
  }
  else{
    digitalWrite(buzzer, LOW);
  }  
}
void datarainsensor(){
  if (value == HIGH) { // Cảm biến đang không mưa
    Serial.println("No raining ");
  } else {
    Serial.println("It is raining");
  }
}
void controlspeaker(){
  int Speaker;
  if (Firebase.getInt(fbdb, "/iotlab/bedroom/Speaker")) 
    Speaker = fbdb.intData();
  if (Speaker == 1)
  {
    digitalWrite(buzzer, HIGH);
    delay(1000);
  }
  else if (Speaker == 0)
  {
    digitalWrite(buzzer, LOW);
     delay(1000);
  }
}
void controlled(){
  int val;
  if (Firebase.getInt(fbdb, "/iotlab/bedroom/Led")) 
    val = fbdb.intData();
  if (val == 1)
  {
    digitalWrite(led, HIGH);
  }
  else if (val == 0)
  {
    digitalWrite(led, LOW);
  }
}
void controlled1(){
  int ledliv;
  if (Firebase.getInt(fbdb, "/iotlab/livingroom/Led")) 
    ledliv = fbdb.intData();
  if (ledliv == 1)
  {
    digitalWrite(led1, HIGH);
  }
  else if (ledliv == 0)
  {
    digitalWrite(led1, LOW);
  }
}
void controlled2(){
  int ledgar;
  if (Firebase.getInt(fbdb, "/iotlab/garden/Led2")) 
    ledgar = fbdb.intData();
  if (ledgar == 1)
  {
    digitalWrite(led2, HIGH);
  }
  else if (ledgar == 0)
  {
    digitalWrite(led2, LOW);
  }
}
void controlservo(){
  int window;
  if (Firebase.getInt(fbdb, "/iotlab/livingroom/Window")) 
    window = fbdb.intData();
  if (window == 1){
      int pos =180;
      servo.write(pos);
      delay(10);
    }
  else if (window == 0){
      int pos =0;
      servo.write(pos);
      delay(10);
    }
}
void senddatafirebase(){
  Firebase.setInt(fbdb,"/iotlab/bedroom/Humidity", hum);     
  Firebase.setInt(fbdb,"/iotlab/bedroom/Temperature", temp);    
  Firebase.setInt(fbdb,"/iotlab/livingroom/Humidity", hum);     
  Firebase.setInt(fbdb,"/iotlab/livingroom/Temperature", temp);   
  Firebase.setInt(fbdb,"/iotlab/garden/Humidity", hum);     
  Firebase.setInt(fbdb,"/iotlab/garden/Temperature", temp); 
  Firebase.setInt(fbdb,"/iotlab/bedroom/Gas", gas_value);  
  Firebase.setInt(fbdb,"/iotlab/garden/Rain", value);
  Firebase.setInt(fbdb,"/iotlab/livingroom/Rain", value);
}
