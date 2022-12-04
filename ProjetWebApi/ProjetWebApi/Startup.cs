using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using ProjetWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.IdentityModel.Tokens;
namespace ProjetWebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)

        {
            //Inject App Settings
            services.Configure<ApplicationSettings>(Configuration.GetSection("AppSettings"));
            //IdentityConfig
            services.AddDefaultIdentity<AppUsers>()
                      .AddRoles<IdentityRole>()
                     .AddEntityFrameworkStores<AuthenticationContext>();
            //Database Context Config
            services.AddDbContext<SoldProductsContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("APPDB"));
            });
            services.AddDbContext<AvisProductContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("APPDB"));
            });
            services.AddDbContext<CommandeContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("APPDB"));
            });
            services.AddDbContext<PaymentContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("APPDB"));
            });
            services.AddDbContext<AvisContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("APPDB"));
            });
            services.AddDbContext < APPDB>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("APPDB"));
            });
            services.AddDbContext<Products_Fr>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("APPDB"));
            });
     
            services.AddDbContext<AuthenticationContext>(options=>{
                options.UseSqlServer(Configuration.GetConnectionString("APPDB"));
            });
            //JWT Config Auth
            var key = Encoding.UTF8.GetBytes(Configuration["AppSettings:JWT_Secret"].ToString()); //secret key
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });
            //Identity Opions Config
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireDigit = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 4;
                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ /-0123456789@.";
                options.User.RequireUniqueEmail = false;
            });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ProjetWebApi", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProjetWebApi v1"));
            }
            //CORS Config
            app.UseCors(builder =>
            builder.WithOrigins(Configuration["AppSettings:Client_URL"].ToString()).AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
