#include <SoftwareSerial.h>
#include "DHT.h"

float temprature =50;     // for temperature
float humidity =0;       // for humidity

String f1= "1";
String f2 ="2";

#define DHTPIN 4     // what digital pin we're connected to

#define DHTTYPE DHT11   // DHT 11

DHT dht(DHTPIN, DHTTYPE);

String apiKey = "FIXT948PTG9LXQMC";

SoftwareSerial ser(2,3); // RX, TX

void setup() {                

  Serial.begin(9600); 
  ser.begin(9600);
  dht.begin();
  ser.println("AT+RST");
  delay(2000);
}


// the loop 
void loop() {
  
 readDHT();
 
 esp_8266(temprature,f2);
 esp_8266(humidity,f1);
}
void readDHT()
{
 
  humidity = dht.readHumidity();

  temprature = dht.readTemperature();

  if (isnan(humidity) || isnan(temprature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }  
}


void esp_8266(float variable,String field)
{
 // convert to string
  char buf[32];
  String strVolt = dtostrf(variable, 4, 1, buf);
  
  // TCP connection
  String cmd = "AT+CIPSTART=\"TCP\",\"";
  cmd += "184.106.153.149"; // api.thingspeak.com
  cmd += "\",80";
  ser.println(cmd);
   
  if(ser.find("Error")){
    Serial.println("AT+CIPSTART error");
    return;
  }
  
  // prepare GET string
  String getStr = "GET /update?api_key=";
  getStr += apiKey;
  getStr +="&field"+field+"=";
  getStr += String(strVolt);
  getStr += "\r\n\r\n";

  // send data length
  cmd = "AT+CIPSEND=";
  cmd += String(getStr.length());
  ser.println(cmd);

  if(ser.find(">")){
    ser.print(getStr);
  }
  else{
    ser.println("AT+CIPCLOSE");
    // alert user
    Serial.println("AT+CIPCLOSE");
  }
    
  // thingspeak needs 15 sec delay between updates
  delay(16000);  
}