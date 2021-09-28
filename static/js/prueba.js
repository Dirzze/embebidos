import time
import random
import paho.mqtt.client as mqtt

client = mqtt.Client()
client.username_pw_set('dirzze.morocho@unach.edu.ec','dirzze1221')
client.connect("maqiatto.com", 1883, 60)

n=0
while n<=10:

    time.sleep(1)
    valor1=random.randint(1,10)  
    valor2=random.randint(10,20)
    client.publish('dirzze.morocho@unach.edu.ec/t2',str(valor1)+';'+str(valor2))
    n=n+1