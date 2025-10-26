using k8s.Models;

var builder = DistributedApplication.CreateBuilder(args);

var apiService = builder.AddProject<Projects.Cc_Api>("cc-api")
    .WithHttpHealthCheck("/health");

builder.AddYarnApp("WebUi", "../Cc.Ui", "start")
    .WithReference(apiService)     // Reference the API service if the frontend needs to call it
    .WaitFor(apiService)
    .WithEnvironment("REACT_APP_API_URL", apiService.GetEndpoint("https"))
    //.WithWorkingDirectory("../Cc.Ui")
    //.WithHttpEndpoint(targetPort: 3000) // The port React actually uses
    //.WithEnvironment("PORT", "3000") // Set port in environment
    //.WithExplicitStart() // or "yarn", "dev" if using Vite
    .WithEnvironment("BROWSER", "none")
    .WithExternalHttpEndpoints()    // Makes the frontend URL externally available and visible in the Aspire dashboard
                                   
    .WithHttpEndpoint(env: "PORT");  // Set the port environment variable CRA expects (PORT is the convention)

//.WithHttpHealthCheck("/health")
// Set a standard environment variable that your CRA setup can use
// to get the *resolved* URL of the backend API service.
// NOTE: Aspire automatically resolves the endpoint's URL at runtime.


builder.Build().Run();
