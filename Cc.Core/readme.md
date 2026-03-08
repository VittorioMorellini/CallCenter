# Scaffolding
```
Scaffold-DbContext "Server=localhost\SQLEXPRESS;Initial Catalog=Callcenter;Persist Security Info=False;User ID=sa;Password=sapwd;MultipleActiveResultSets=True;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -Project cc.Core -StartupProject cc.Core -OutputDir Models -Context CcDbContext -Schemas dbo -NoPluralize -Force -NoOnConfiguring
```