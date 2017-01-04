# SlangEchoSkill
A JavaScript project to form a simple Amazon Alexa skill to help you understand London slang.   
This is a simple skill to respond to general slang questions through the Amazon Echo device.

#### How it works
When the user opens the skill it sends a small request to an AWS lambda server which the index.js file which sends back a result as an output to the user.
The result is found by taking the custom input of a slang word and returning the correct definiton based on the definiton.js file.

##### Things to do...
1. Add some of the following features:   
... Add intent handeling for definiton of a user defined word   
... Add more words to LIST_OF_WORDS that the user could ask   
... Add more definitions for said words in definitions.js file   
... Migrate from `LITTERAL` slot type to the improved custom slot types   
2. Sort out any bugs under the issues tab     
3. Add an easter egg?    



>######This is currently under development and all required files are within this repo credited under open source Apache License
This project is based arround the alexa-skills-kit-js where I used their documentation to learn how to build this skill 
---
###### © Conor Hennessy 2016-2017
