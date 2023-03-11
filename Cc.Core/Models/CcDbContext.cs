using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Cc.Core.Models
{
    public partial class CcDbContext : DbContext
    {
        public CcDbContext()
        {
        }

        public CcDbContext(DbContextOptions<CcDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Agency> Agency { get; set; } = null!;
        public virtual DbSet<Appointment> Appointment { get; set; } = null!;
        public virtual DbSet<AppointmentEnding> AppointmentEnding { get; set; } = null!;
        public virtual DbSet<AppointmentReject> AppointmentReject { get; set; } = null!;
        public virtual DbSet<AppointmentType> AppointmentType { get; set; } = null!;
        public virtual DbSet<Broadcasting> Broadcasting { get; set; } = null!;
        public virtual DbSet<BroadcastingProduct> BroadcastingProduct { get; set; } = null!;
        public virtual DbSet<BroadcastingTabRegion> BroadcastingTabRegion { get; set; } = null!;
        public virtual DbSet<Category> Category { get; set; } = null!;
        public virtual DbSet<Commission> Commission { get; set; } = null!;
        public virtual DbSet<Company> Company { get; set; } = null!;
        public virtual DbSet<Configuration> Configuration { get; set; } = null!;
        public virtual DbSet<Control> Control { get; set; } = null!;
        public virtual DbSet<Customer> Customer { get; set; } = null!;
        public virtual DbSet<CustomerCall> CustomerCall { get; set; } = null!;
        public virtual DbSet<CustomerRequiredField> CustomerRequiredField { get; set; } = null!;
        public virtual DbSet<Document> Document { get; set; } = null!;
        public virtual DbSet<Event> Event { get; set; } = null!;
        public virtual DbSet<EventAttachment> EventAttachment { get; set; } = null!;
        public virtual DbSet<EventType> EventType { get; set; } = null!;
        public virtual DbSet<Grouping> Grouping { get; set; } = null!;
        public virtual DbSet<Investment> Investment { get; set; } = null!;
        public virtual DbSet<LogChange> LogChange { get; set; } = null!;
        public virtual DbSet<LogQuery> LogQuery { get; set; } = null!;
        public virtual DbSet<Measure> Measure { get; set; } = null!;
        public virtual DbSet<OrderPayment> OrderPayment { get; set; } = null!;
        public virtual DbSet<OrderRow> OrderRow { get; set; } = null!;
        public virtual DbSet<OrderState> OrderState { get; set; } = null!;
        public virtual DbSet<OrderTable> OrderTable { get; set; } = null!;
        public virtual DbSet<PaymentType> PaymentType { get; set; } = null!;
        public virtual DbSet<Principal> Principal { get; set; } = null!;
        public virtual DbSet<PrincipalAuth> PrincipalAuth { get; set; } = null!;
        public virtual DbSet<PrincipalFather> PrincipalFather { get; set; } = null!;
        public virtual DbSet<PrincipalGrouping> PrincipalGrouping { get; set; } = null!;
        public virtual DbSet<PrincipalRole> PrincipalRole { get; set; } = null!;
        public virtual DbSet<PrincipalTabRegion> PrincipalTabRegion { get; set; } = null!;
        public virtual DbSet<Product> Product { get; set; } = null!;
        public virtual DbSet<Region> Region { get; set; } = null!;
        public virtual DbSet<RoleControl> RoleControl { get; set; } = null!;
        public virtual DbSet<TabCity> TabCity { get; set; } = null!;
        public virtual DbSet<TabCountry> TabCountry { get; set; } = null!;
        public virtual DbSet<TabDistrict> TabDistrict { get; set; } = null!;
        public virtual DbSet<TabRegion> TabRegion { get; set; } = null!;
        public virtual DbSet<Vat> Vat { get; set; } = null!;
        public virtual DbSet<Warehouse> Warehouse { get; set; } = null!;
        public virtual DbSet<WarehouseMovement> WarehouseMovement { get; set; } = null!;
        public virtual DbSet<WarehouseType> WarehouseType { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=S-2020-000002\\Sqlexpress;Initial Catalog=Callcenter;Persist Security Info=False;User ID=sa;Password=sapwd");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Agency>(entity =>
            {
                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Cap)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CityCode)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Code)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Mail)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ProvinceCode)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.VatCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Agency)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Agency_Company");
            });

            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.Property(e => e.DateFrom).HasColumnType("datetime");

                entity.Property(e => e.DateTo).HasColumnType("datetime");

                entity.Property(e => e.District)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate).HasColumnType("datetime");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Motivation)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.AppointmentEnding)
                    .WithMany(p => p.Appointment)
                    .HasForeignKey(d => d.AppointmentEndingId)
                    .HasConstraintName("FK_Appointment_AppointmentEnding");

                entity.HasOne(d => d.AppointmentType)
                    .WithMany(p => p.Appointment)
                    .HasForeignKey(d => d.AppointmentTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Appointment_AppointmentType");

                entity.HasOne(d => d.Salesman)
                    .WithMany(p => p.Appointment)
                    .HasForeignKey(d => d.SalesmanId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Appointment_Principal");
            });

            modelBuilder.Entity<AppointmentEnding>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Color)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Outcome)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<AppointmentReject>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Reject)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<AppointmentType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Page)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Role)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Broadcasting>(entity =>
            {
                entity.Property(e => e.AuthorityData)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.AuthorityName)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Notes)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<BroadcastingProduct>(entity =>
            {
                entity.HasOne(d => d.Broadcasting)
                    .WithMany(p => p.BroadcastingProduct)
                    .HasForeignKey(d => d.BroadcastingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BroadcastingProduct_Broadcasting");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.BroadcastingProduct)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BroadcastingProduct_Product");
            });

            modelBuilder.Entity<BroadcastingTabRegion>(entity =>
            {
                entity.HasOne(d => d.Broadcasting)
                    .WithMany(p => p.BroadcastingTabRegion)
                    .HasForeignKey(d => d.BroadcastingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BroadcastingTabRegion_Broadcasting");

                entity.HasOne(d => d.TabRegion)
                    .WithMany(p => p.BroadcastingTabRegion)
                    .HasForeignKey(d => d.TabRegionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BroadcastingTabRegion_TabRegion");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SubProduct)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Commission>(entity =>
            {
                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Company>(entity =>
            {
                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.BusinessName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Mail)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TaxCode)
                    .HasMaxLength(16)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.VatCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Configuration>(entity =>
            {
                entity.HasIndex(e => e.CompanyId, "UQ_Configuration")
                    .IsUnique();

                entity.Property(e => e.FtpDoneDir)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FtpInputDir)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FtpOutputDir)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FtpPassword)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FtpPort)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FtpServer)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FtpUsername)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FtpWorkingDir)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LegalArchivingMode)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.LegalBusCompany)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LegalBusPassword)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LegalBusStagingCompany)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LegalBusStagingPassword)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LegalBusStagingUrl)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LegalBusStagingUsername)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LegalBusUrl)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LegalBusUsername)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PersonDefaultCountry)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PersonDefaultPhonePrefix)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.TopCompany)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TopPassword)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TopStagingCompany)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TopStagingPassword)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TopStagingUrl)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TopStagingUsername)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TopUrl)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.TopUsername)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorErrorContrastText)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorErrorDark)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorErrorLight)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorErrorMain)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorInfoContrastText)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorInfoDark)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorInfoLight)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorInfoMain)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorPrimaryContrastText)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorPrimaryDark)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorPrimaryLight)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorPrimaryMain)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorSecondaryContrastText)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorSecondaryDark)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorSecondaryLight)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorSecondaryMain)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorSuccessContrastText)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorSuccessDark)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorSuccessLight)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorSuccessMain)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorTextDisabled)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorTextHint)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorTextPrimary)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorTextSecondary)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorWarningContrastText)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorWarningDark)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorWarningLight)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiColorWarningMain)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiCustomerDetail)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UiHome)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.UiLanguage)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiLogoBackground)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.UiLogoUrl)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Company)
                    .WithOne(p => p.Configuration)
                    .HasForeignKey<Configuration>(d => d.CompanyId)
                    .HasConstraintName("FK_Configuration_Company");
            });

            modelBuilder.Entity<Control>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Descrption)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Label)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Page)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.BirthDate).HasColumnType("datetime");

                entity.Property(e => e.Cap)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.City)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ContactDate).HasColumnType("datetime");

                entity.Property(e => e.Country)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Disabled).HasColumnType("datetime");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.IdentificationDocCountry)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.IdentificationDocExpirationDate).HasColumnType("datetime");

                entity.Property(e => e.IdentificationDocNumber)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.IdentificationDocReleaseDate).HasColumnType("datetime");

                entity.Property(e => e.IdentificationDocType)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Mail)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MobilePhone)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Notes).IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RecallDate).HasColumnType("datetime");

                entity.Property(e => e.Sex)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.TaxCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.VatCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Agency)
                    .WithMany(p => p.Customer)
                    .HasForeignKey(d => d.AgencyId)
                    .HasConstraintName("FK_Customer_Agency");

                entity.HasOne(d => d.Broadcasting)
                    .WithMany(p => p.Customer)
                    .HasForeignKey(d => d.BroadcastingId)
                    .HasConstraintName("FK_Customer_Broadcasting");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Customer)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("FK_Customer_Company");

                entity.HasOne(d => d.District)
                    .WithMany(p => p.Customer)
                    .HasForeignKey(d => d.DistrictId)
                    .HasConstraintName("FK_Customer_District");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Customer)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_Customer_Product");

                entity.HasOne(d => d.Salesman)
                    .WithMany(p => p.Customer)
                    .HasForeignKey(d => d.SalesmanId)
                    .HasConstraintName("FK_Customer_Principal");
            });

            modelBuilder.Entity<CustomerCall>(entity =>
            {
                entity.Property(e => e.CallDate).HasColumnType("datetime");

                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.CustomerCall)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CustomerCall_Customer");

                entity.HasOne(d => d.Principal)
                    .WithMany(p => p.CustomerCall)
                    .HasForeignKey(d => d.PrincipalId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CustomerCall_Principal");
            });

            modelBuilder.Entity<CustomerRequiredField>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.InsertDate).HasColumnType("datetime");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Agency)
                    .WithMany(p => p.CustomerRequiredField)
                    .HasForeignKey(d => d.AgencyId)
                    .HasConstraintName("FK_CustomerRequiredField_Agency");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CustomerRequiredField)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("FK_CustomerRequiredField_Company");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.CustomerRequiredField)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_CustomerRequiredField_Product");
            });

            modelBuilder.Entity<Document>(entity =>
            {
                entity.Property(e => e.Entity)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ExternalId)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ExternalIdSigned)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Repository)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.RepositorySigned)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.StatusMessage)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.Property(e => e.AttachmentName)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.EventDate).HasColumnType("datetime");

                entity.Property(e => e.InsertDate).HasColumnType("datetime");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.EventType)
                    .WithMany(p => p.Event)
                    .HasForeignKey(d => d.EventTypeId)
                    .HasConstraintName("FK_Event_EventType");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Event)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK_Event_Order");
            });

            modelBuilder.Entity<EventAttachment>(entity =>
            {
                entity.Property(e => e.AttachmentName)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate).HasColumnType("datetime");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.EventAttachment)
                    .HasForeignKey(d => d.EventId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_EventAttachment_Event");
            });

            modelBuilder.Entity<EventType>(entity =>
            {
                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate).HasColumnType("datetime");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Grouping>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Investment>(entity =>
            {
                entity.Property(e => e.DateFrom).HasColumnType("datetime");

                entity.Property(e => e.DateTo).HasColumnType("datetime");

                entity.Property(e => e.DeleteDate).HasColumnType("datetime");

                entity.Property(e => e.DeleteUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate).HasColumnType("datetime");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Broadcasting)
                    .WithMany(p => p.Investment)
                    .HasForeignKey(d => d.BroadcastingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Investment_Broadcasting");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Investment)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_Investment_Category");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Investment)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_Investment_Product");
            });

            modelBuilder.Entity<LogChange>(entity =>
            {
                entity.Property(e => e.Action)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.RefTable)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RefUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LogQuery>(entity =>
            {
                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Error)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Model)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Parameters)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Query)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Table)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.User)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Measure>(entity =>
            {
                entity.Property(e => e.DeleteDate).HasColumnType("datetime");

                entity.Property(e => e.DeleteUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate).HasColumnType("datetime");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<OrderPayment>(entity =>
            {
                entity.Property(e => e.DueDate).HasColumnType("datetime");

                entity.Property(e => e.InsertDate).HasColumnType("datetime");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderPayment)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderPayment_Order");
            });

            modelBuilder.Entity<OrderRow>(entity =>
            {
                entity.Property(e => e.InsertDate).HasColumnType("datetime");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.RegistrationNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Measure)
                    .WithMany(p => p.OrderRow)
                    .HasForeignKey(d => d.MeasureId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderRow_Measure");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderRow)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderRow_Product");
            });

            modelBuilder.Entity<OrderState>(entity =>
            {
                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<OrderTable>(entity =>
            {
                entity.Property(e => e.Accountholder)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.InvoiceDate).HasColumnType("datetime");

                entity.Property(e => e.InvoiceNumber)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Notes)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.OrderDate).HasColumnType("datetime");

                entity.Property(e => e.Taxcode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Vatcode)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PaymentType>(entity =>
            {
                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Principal>(entity =>
            {
                entity.Property(e => e.Address)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Cap)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.City)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Country)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.District)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Language)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Mail)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MobilePhone)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Notes)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Role)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Surname)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TaxCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Avatar)
                    .WithMany(p => p.Principal)
                    .HasForeignKey(d => d.AvatarId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Principal_Document");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Principal)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Principal_Company");
            });

            modelBuilder.Entity<PrincipalAuth>(entity =>
            {
                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UserPath)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Agency)
                    .WithMany(p => p.PrincipalAuth)
                    .HasForeignKey(d => d.AgencyId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_PrincipalAuth_Agency");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.PrincipalAuth)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_PrincipalAuth_Category");

                entity.HasOne(d => d.Principal)
                    .WithMany(p => p.PrincipalAuth)
                    .HasForeignKey(d => d.PrincipalId)
                    .HasConstraintName("FK_PrincipalAuth_Principal");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.PrincipalAuth)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_PrincipalAuth_Product");
            });

            modelBuilder.Entity<PrincipalFather>(entity =>
            {
                entity.HasOne(d => d.Father)
                    .WithMany(p => p.PrincipalFatherFather)
                    .HasForeignKey(d => d.FatherId)
                    .HasConstraintName("FK_PrincipalFather_Father");

                entity.HasOne(d => d.Principal)
                    .WithMany(p => p.PrincipalFatherPrincipal)
                    .HasForeignKey(d => d.PrincipalId)
                    .HasConstraintName("FK_PrincipalFather_Principal");
            });

            modelBuilder.Entity<PrincipalGrouping>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Grouping)
                    .WithMany(p => p.PrincipalGrouping)
                    .HasForeignKey(d => d.GroupingId)
                    .HasConstraintName("FK_PrincipalGrouping_Grouping");

                entity.HasOne(d => d.Principal)
                    .WithMany(p => p.PrincipalGrouping)
                    .HasForeignKey(d => d.PrincipalId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrincipalGrouping_Principal");
            });

            modelBuilder.Entity<PrincipalRole>(entity =>
            {
                entity.Property(e => e.Role)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Principal)
                    .WithMany(p => p.PrincipalRole)
                    .HasForeignKey(d => d.PrincipalId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrincipalRole_Principal");
            });

            modelBuilder.Entity<PrincipalTabRegion>(entity =>
            {
                entity.HasIndex(e => new { e.PrincipalId, e.TabRegionId }, "IX_Un_PrincipalRegion")
                    .IsUnique();

                entity.HasOne(d => d.Principal)
                    .WithMany(p => p.PrincipalTabRegion)
                    .HasForeignKey(d => d.PrincipalId)
                    .HasConstraintName("FK_PrincipalTabRegion_Principal");

                entity.HasOne(d => d.TabRegion)
                    .WithMany(p => p.PrincipalTabRegion)
                    .HasForeignKey(d => d.TabRegionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrincipalTabRegion_TabRegion");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Code)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_Product_Category");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Product_Company");
            });

            modelBuilder.Entity<Region>(entity =>
            {
                entity.Property(e => e.Code)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Region)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Region_Company");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("FK_Region_Parent");
            });

            modelBuilder.Entity<RoleControl>(entity =>
            {
                entity.Property(e => e.Page)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Role)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Control)
                    .WithMany(p => p.RoleControl)
                    .HasForeignKey(d => d.ControlId)
                    .HasConstraintName("FK_RoleControl_Control");
            });

            modelBuilder.Entity<TabCity>(entity =>
            {
                entity.HasIndex(e => e.TabDistrictId, "IX_TabCity_TabDistrict");

                entity.Property(e => e.CadastralCode)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.Code)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.IstatCode)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.TabDistrict)
                    .WithMany(p => p.TabCity)
                    .HasForeignKey(d => d.TabDistrictId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TabCity_TabDistrict");
            });

            modelBuilder.Entity<TabCountry>(entity =>
            {
                entity.Property(e => e.Citizenship)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Code)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Iso2Code)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Iso3Code)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.LocalName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TabDistrict>(entity =>
            {
                entity.HasIndex(e => e.Code, "IX_TabDiscrict_Code");

                entity.Property(e => e.Code)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.IstatCode)
                    .HasMaxLength(3)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.TabRegion)
                    .WithMany(p => p.TabDistrict)
                    .HasForeignKey(d => d.TabRegionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TabDistrict_TabRegion");
            });

            modelBuilder.Entity<TabRegion>(entity =>
            {
                entity.Property(e => e.Code)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.NationCode)
                    .HasMaxLength(2)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Vat>(entity =>
            {
                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.VatCode)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Warehouse>(entity =>
            {
                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate).HasColumnType("datetime");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Salesman)
                    .WithMany(p => p.Warehouse)
                    .HasForeignKey(d => d.SalesmanId)
                    .HasConstraintName("FK_Warehouse_Principal");

                entity.HasOne(d => d.WarehouseType)
                    .WithMany(p => p.Warehouse)
                    .HasForeignKey(d => d.WarehouseTypeId)
                    .HasConstraintName("FK_Warehouse_WarehouseType");
            });

            modelBuilder.Entity<WarehouseMovement>(entity =>
            {
                entity.Property(e => e.DeleteDate).HasColumnType("datetime");

                entity.Property(e => e.DeleteUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate).HasColumnType("datetime");

                entity.Property(e => e.InsertUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.MovementDate).HasColumnType("datetime");

                entity.Property(e => e.Notes)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");

                entity.Property(e => e.UpdateUser)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.WarehouseMovement)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WarehouseMovement_Product");

                entity.HasOne(d => d.WarehouseIdFromNavigation)
                    .WithMany(p => p.WarehouseMovementWarehouseIdFromNavigation)
                    .HasForeignKey(d => d.WarehouseIdFrom)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WarehouseMovement_WarehouseFrom");

                entity.HasOne(d => d.WarehouseIdToNavigation)
                    .WithMany(p => p.WarehouseMovementWarehouseIdToNavigation)
                    .HasForeignKey(d => d.WarehouseIdTo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_WarehouseMovement_WarehouseTo");
            });

            modelBuilder.Entity<WarehouseType>(entity =>
            {
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
