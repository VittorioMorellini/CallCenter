using k8s.Models;

var builder = DistributedApplication.CreateBuilder(args);

var apiService = builder.AddProject<Projects.Cc_Api>("cc-api");

builder.AddYarnApp("WebUi", "../Cc.Ui", "start")
    .WithReference(apiService) // Reference the API service if the frontend needs to call it
    .WithExternalHttpEndpoints() // Makes the frontend URL externally available and visible in the Aspire dashboard
    .WithEnvironment("BROWSER", "none")

    // Set a standard environment variable that your CRA setup can use
    // to get the *resolved* URL of the backend API service.
    // NOTE: Aspire automatically resolves the endpoint's URL at runtime.
    .WithEnvironment("REACT_APP_API_URL", apiService.GetEndpoint("https"))

    // Set the port environment variable CRA expects (PORT is the convention)
    .WithHttpEndpoint(env: "PORT");

builder.Build().Run();
