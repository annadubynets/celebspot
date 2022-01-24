## Celebspot Markup Project ##


#### Prerequisites ####

1. Install nodeenv

        pip3 install nodeenv


2. Create a virtualenv with the 17 node version

        nodeenv -n 17.1.0 env

3. Active it 

        . env/bin/activate

4. Install node dependencies

        npm install


### How to compile the font icons ###

Make sure you executes all the steps from the prerequisites chapter above. Then run the following command:

        npm run generate-fonts


### Dev sass compilation ###

The following command starts the sass compilation process and watches for the sass files changes

        npm run dev
