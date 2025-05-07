# API call example with JavaScript to Clarifai General Image Recognition

## Information
[NTI X Hub AI] Hub GenAI for Future Founders: Week 2 - Exercise 2.2

Name: **Hoang Tran Nhat Minh**

GitHub repository: https://github.com/htnminh/api-call-js-example

## Preview
```
Waiting 1 second before next request...
Waiting 1 second before next request...
Waiting 1 second before next request...
===========================================================================
Image recognition with Clarifai

Image URL: https://samples.clarifai.com/metro-north.jpg
Model ID: general-image-recognition
Model version ID: aa7f35c01e0642fda5cf400f543e7c40

Confidence (%)   Concept
--------------   -------
         99.96   train
         99.93   railway
         99.83   subway system
         99.80   station
         99.73   locomotive
         99.70   transportation system
         98.90   travel
         98.09   commuter
         98.07   platform
         97.43   light
         96.89   train station
         96.73   blur
         96.16   city
         96.14   road
         96.04   urban
         95.99   traffic
         94.77   street
         93.43   public
         93.22   tramway
         92.94   business

Waiting 1 second before next request...
===========================================================================
Image recognition with Clarifai

Image URL: https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba
Model ID: general-image-recognition
Model version ID: aa7f35c01e0642fda5cf400f543e7c40

Confidence (%)   Concept
--------------   -------
         99.98   cat
         99.50   kitten
         99.48   cute
         99.14   whisker
         98.78   eye
         98.69   animal
         98.47   pet
         98.47   fur
         98.16   curiosity
         97.82   funny
         96.56   mammal
         96.23   little
         95.85   sit
         95.22   portrait
         91.68   one
         91.61   looking
         91.57   downy
         91.15   no person
         91.10   domestic
         90.29   young
```

## How to run
1. Register an account on [Clarifai](https://clarifai.com/) and get your own Personal Access Token (PAT).

2. Create an `.env` file in the root directory:
```
CLARIFAI_PAT=<your_clarifai_pat>
```

3. Modify the [api_call_example.js](api_call_example.js) file to use your own configuration. That part is currently like this:
```javascript
const USER_ID = 'nhatminh2';       
const APP_ID = 'hub-gen-ai';
```

4. (Optional) Modify the [image_urls.txt](image_urls.txt) file to use your own image URLs.

5. Run:
```
npm install  # once
npm start
```

## Prompts
```
leave @_example.js  as is. in @api_call_example.js , do the following:
- follow the example
- let me set up private credentials in an environment variable file (.env file)
- add that file to git ignore
- in directory /images, download 5 images from unsplash
- list the 5 download links in /images/README.md 
we will develop more in next steps, just do that for now.
```
```
your tools don't allow you to edit .env file. write me the format of the file.
```
```
all the 4 ids are not private credentials., only the pat. fix the @api_call_example.js when .env only contains CLARIFAI_PAT=6bbaca97a4be4845879323f4bd455587
```
```
i have put the response in @_example_output.json 
is there a (simple) way to visualize this?
```
```
i just realized there are no bounding boxes. now, simply merge the @visualize_results.js into @api_call_example.js , and don't print the raw json into the output, just the formatted result.
```
```
can i delete @visualize_results.js now? 
```
    since the names of objects could be arbitrarily long, and i want some more information, format the output like this
    ```
    Image recognition with Clarifai
    ==========
    Image URL: <the url>
    Model ID: <id>
    Model version ID: <ver id>
    ==========
    <a simple terminal table with headers: Confidence (%), Concept
    the columns are in that order, and the confidence numbers without percentage mark>
    ```
```
i have deleted the /images directory and made some modifications in @api_call_example.js . create a file named image_urls.txt, in which it contains an url of image on each line. make the @api_call_example.js calls fetch from that file instead.
```
```
since i have read that they limit 1 call / sec. make the wait 1 second between each call.
```
```
some images have this issue. i think it's due to async. don't use async at all, simply loop through them. we'll see if the error persist.
```
> terminal context:
```
Error processing image: https://samples.clarifai.com/metro-north.jpg
Error details: TypeError: Cannot read properties of undefined (reading 'sort')
    at analyzeImage (C:\Users\nhatm\OneDrive - Hanoi University of Science and Technology\Documents\GitHub\api-call-js-example\api_call_example.js:53:18)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async processAllImages (C:\Users\nhatm\OneDrive - Hanoi University of Science and Technology\Documents\GitHub\api-call-js-example\api_call_example.js:86:9)   
Waiting 1 second before next request...
Error processing image: https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba
Error details: TypeError: Cannot read properties of undefined (reading 'sort')
    at analyzeImage (C:\Users\nhatm\OneDrive - Hanoi University of Science and Technology\Documents\GitHub\api-call-js-example\api_call_example.js:53:18)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async processAllImages (C:\Users\nhatm\OneDrive - Hanoi University of Science and Technology\Documents\GitHub\api-call-js-example\api_call_example.js:86:9)   
```
```
the errors are still the same. likely due to this function.
```
> terminal context 1:
```
            concepts.sort((a, b) => b.value - a.value);
```
> terminal context 2:
```
Error processing image: https://images.unsplash.com/photo-1746286891817-bde8cce15a7c
Error details: TypeError: Cannot read properties of undefined (reading 'sort')
    at C:\Users\nhatm\OneDrive - Hanoi University of Science and Technology\Documents\GitHub\api-call-js-example\api_call_example.js:52:22
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
```
```
    "details": "Download of URL: https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba\r failed with error: parse \"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba\\r\": net/url: invalid control character in URL",

seems like there's some "\r" in the string. comment out (don't remove, that might be helpful in the future) the logging you've done. make sure no "\n" or "\r" or some weird escape characters slide in the urls.
```