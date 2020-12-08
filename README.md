# City Care Front end
          Create an angular project
                    

# Navigation        
          Connected the navigation links used in the header to the components they belong to.
          Connected the team name in the footer to a link leading to the about us page. 


# Generate the starter templates for the structure of the app


          ng g c components/registration - creates registration component
          ng g c components/login - creates login component
          ng g c components/profile - creates profile component
          ng g c components/home - creates home component
          ng g c components/create - creates the create post component
          ng g c components/search - creates the search component
          ng g c components/header - creates the header component
          ng g c components/footer - creates the footer component
          ng g c components/team-bio - create an about us component

# Create the models for the front end use

          ng g class shared/models/user --type=model - create the front end user model
          ng g class shared/models/authorization --type=model - create the front end authorization model
          ng g class shared/models/category --type=model - create the front end category model
          ng g class shared/models/subcategory --type=model - create the front end subcategory model
          ng g class shared/models/listing --type-model -  create the front end listing model
          ng g class shared/models/request --type=model - create the front end request model
          ng g class shared/models/organization --type=model - create the organization model

          Install the ng2-search-filter package - npm i ng2-search-filter --save - update the app module to include the ng2searchpipemodule

# Create three services for use in the application
          ng g s shared/services/authorization - create an authoriztion service for registration, login and authentication
          ng g interceptor shared/services/token - create an http token interceptor
          ng g s shared/services/search - create a service for searching the databases
          ng g s shared/services/request - create a service for the requests made by organizations and users
          ng g s shared/services/listing - create a service for the listings made by organizations and users
          npm install --save toastr
          npm install @angular/animations --save - add angular animations to render the alerts from ngx-toaster

          npm install --save ng2-file-upload
                    


