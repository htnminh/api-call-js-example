require('dotenv').config();
const fs = require('fs');

// Get PAT from environment variables
const PAT = process.env.CLARIFAI_PAT;

// These are public IDs, no need to be in .env
const USER_ID = 'nhatminh2';       
const APP_ID = 'hub-gen-ai';
const MODEL_ID = 'general-image-recognition';
const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    

// Read image URLs from file and clean them
const imageUrls = fs.readFileSync('image_urls.txt', 'utf8')
    .split('\n')
    .map(url => url.trim().replace(/[\r\n]+/g, '')) // Remove any \r, \n, and trim whitespace
    .filter(url => url !== ''); // Remove empty lines

// Function to make API call for a single image
function analyzeImage(imageUrl) {
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": imageUrl
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(data => {
            // Debug: Log the response structure
            // console.log('API Response:', JSON.stringify(data, null, 2));

            // Check if we have valid data
            if (!data.outputs || !data.outputs[0] || !data.outputs[0].data || !data.outputs[0].data.concepts) {
                console.log('Invalid response structure for image:', imageUrl);
                return;
            }

            // Get the concepts from the first output
            const concepts = data.outputs[0].data.concepts;

            // Sort concepts by confidence value (descending)
            concepts.sort((a, b) => b.value - a.value);

            // Print header information
            console.log('===========================================================================');
            console.log('Image recognition with Clarifai');
            console.log('');
            console.log(`Image URL: ${imageUrl}`);
            console.log(`Model ID: ${MODEL_ID}`);
            console.log(`Model version ID: ${MODEL_VERSION_ID}`);
            console.log('');

            // Print table header
            console.log('Confidence (%)   Concept');
            console.log('--------------   -------');

            // Print each concept with aligned columns
            concepts.forEach(concept => {
                const confidence = (concept.value * 100).toFixed(2);
                console.log(`${confidence.padStart(14)}   ${concept.name}`);
            });
            console.log(''); // Add extra line between images
        })
        .catch(error => {
            console.log('Error processing image:', imageUrl);
            console.log('Error details:', error);
        });
}

// Process all images with 1 second delay between calls
function processAllImages() {
    let index = 0;
    
    function processNext() {
        if (index < imageUrls.length) {
            analyzeImage(imageUrls[index]);
            index++;
            
            if (index < imageUrls.length) {
                console.log('Waiting 1 second before next request...');
                setTimeout(processNext, 1000);
            }
        }
    }
    
    processNext();
}

// Start processing
processAllImages();
