'''
Name:		Kelly Jia
File:		script.py
Class:		TEJ4M1-01
Date:		January 13, 2016
Description:	   This program contains all the Python macros to set the duty cycles of the servo motors of the Boe-Bots, which controls
                the maneuvers of the bot. The macros are called by the functions in the Javascript program (buttons.js).
'''

#import the webiopi library and the time library (for delays)
import webiopi
import time

#set the GPIO pins to the WebIOPi GPIO pins to use the WebIOPi GPIO library
GPIO = webiopi.GPIO

#set the left motor as GPIO pin 2 and the right motor as GPIO pin 3
leftMotor = 2
rightMotor = 3

#setup()
#The setup function is automatically called by WebIOPi at start up
#Set the 2 GPIO pins as PWM pins and set their initial duty cycle as 0 (stop)
def setup():
    GPIO.setFunction(leftMotor,GPIO.PWM)
    GPIO.setFunction(rightMotor,GPIO.PWM)
    GPIO.pwmWrite(leftMotor,0)
    GPIO.pwmWrite(rightMotor,0)

#destroy()
#The destroy function is automatically called by WebIOPi when the program is terminated
#Set the 2 GPIO pins back to input pins for safety (good practice)
def destroy():
    GPIO.setFunction(leftMotor, GPIO.IN)
    GPIO.setFunction(rightMotor, GPIO.IN)

#leftF()
#The left forward function sets the duty cycles so the bot turns left forward
@webiopi.macro
def leftF():
    GPIO.pwmWrite(leftMotor,0.07)
    GPIO.pwmWrite(rightMotor,0.05)
    time.sleep(0.1)

#rightF()
#The left forward function sets the duty cycles so the bot turns right forward    
@webiopi.macro
def rightF():
    GPIO.pwmWrite(leftMotor,0.1)
    GPIO.pwmWrite(rightMotor,0.072)
    time.sleep(0.1)

#leftB()
#The left backward function sets the duty cycles so the bot turns left backward
@webiopi.macro
def leftB():
    GPIO.pwmWrite(leftMotor,0.07)
    GPIO.pwmWrite(rightMotor,0.1)
    time.sleep(0.1)

#rightB()
#The right backward function sets the duty cycles so the bot turns right backward
@webiopi.macro
def rightB():
    GPIO.pwmWrite(leftMotor,0.061)
    GPIO.pwmWrite(rightMotor,0.072)
    time.sleep(0.1)

#forward()
#The forward function sets the duty cycles so the bot goes straight forward
@webiopi.macro
def forward():
    GPIO.pwmWrite(leftMotor,0.1)
    GPIO.pwmWrite(rightMotor,0.061)
    time.sleep(0.1)

#backward()
#The backward function sets the duty cycles so the bot goes straight backward
@webiopi.macro
def backward():
    GPIO.pwmWrite(leftMotor,0.061)
    GPIO.pwmWrite(rightMotor,0.1)    
    time.sleep(0.1)

#stop()
#The stop function sets the duty cycles so the bot goes to a complete stop
@webiopi.macro
def stop():
    GPIO.pwmWrite(leftMotor,0)
    GPIO.pwmWrite(rightMotor,0)
    time.sleep(0.1)
