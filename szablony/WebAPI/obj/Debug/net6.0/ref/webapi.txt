using System.ComponentModel;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MyDbContext>(options => options.UseInMemoryDatabase("PoteznaBaza"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:5173", "http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader();
        }
    );
});

var app = builder.Build();
InitDB(app);

app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// pobierz wszystkich
app.MapGet("/students", async (MyDbContext db) => await db.Students.ToListAsync());

// pobierz po id
app.MapGet("/students/{id}", async (MyDbContext db, int id) => await db.Students.FindAsync(id));

// stworz studenta
app.MapPost("/students", async (Student student, MyDbContext db) =>
{
    db.Students.Add(student);
    await db.SaveChangesAsync();
    return Results.Created($"/students/{student.Id}", student);
});

// edycja studenta
app.MapPut("/students/{id}", async (int id, Student updatedStudent, MyDbContext db) =>
{
    var student = await db.Students.FindAsync(id);
    if (student == null) return Results.NotFound();
    student.Surname = updatedStudent.Surname;
    student.Name = updatedStudent.Name;
    student.Age = updatedStudent.Age;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/students/{id}", async (int id, MyDbContext db) =>
{
    var student = await db.Students.FindAsync(id);
    if (student == null) return Results.NotFound();
    db.Students.Remove(student);
    await db.SaveChangesAsync();
    return Results.Ok("Usunieto studenta");
});

void InitDB(WebApplication app)
{
    var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<MyDbContext>();

    db.Students.AddRange(
        new Student { Name = "Konrad", Surname = "Kulesza", Age = 23 },
        new Student { Name = "Karolina", Surname = "Budzik", Age = 21 },
        new Student { Name = "Jakis", Surname = "Random", Age = 99 }
    );
    db.SaveChanges();
}

app.Run();


public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public int Age { get; set; }
}
public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    {

    }

    public DbSet<Student> Students { get; set; }
}