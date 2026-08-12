using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TDPCompetitions.Infrastracture.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FileName = table.Column<string>(type: "text", nullable: false),
                    ContentType = table.Column<string>(type: "text", nullable: false),
                    Length = table.Column<long>(type: "bigint", nullable: false),
                    Data = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SentProblems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompetitionId = table.Column<Guid>(type: "uuid", nullable: false),
                    CompetitorId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProblemId = table.Column<Guid>(type: "uuid", nullable: false),
                    SentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SentProblems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SentSpecialProblems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompetitionId = table.Column<Guid>(type: "uuid", nullable: false),
                    CompetitorId = table.Column<Guid>(type: "uuid", nullable: false),
                    SpecialProblemId = table.Column<Guid>(type: "uuid", nullable: false),
                    SentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SentSpecialProblems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Competitions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Slug = table.Column<string>(type: "text", nullable: false),
                    RegistrationsOpen = table.Column<bool>(type: "boolean", nullable: false),
                    RankingsVisible = table.Column<bool>(type: "boolean", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EmailSubject = table.Column<string>(type: "text", nullable: false),
                    EmailText = table.Column<string>(type: "text", nullable: false),
                    PrivacyText = table.Column<string>(type: "text", nullable: false),
                    PrivacyAttachmentId = table.Column<Guid>(type: "uuid", nullable: true),
                    Status = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Competitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Competitions_Files_PrivacyAttachmentId",
                        column: x => x.PrivacyAttachmentId,
                        principalTable: "Files",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProblemsGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    ColorCode = table.Column<string>(type: "text", nullable: false),
                    CompetitionId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProblemsGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProblemsGroups_Competitions_CompetitionId",
                        column: x => x.CompetitionId,
                        principalTable: "Competitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SpecialProblems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    CompetitionId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecialProblems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SpecialProblems_Competitions_CompetitionId",
                        column: x => x.CompetitionId,
                        principalTable: "Competitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Problems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ProblemGroupId = table.Column<Guid>(type: "uuid", nullable: false),
                    CompetitionId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Problems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Problems_ProblemsGroups_ProblemGroupId",
                        column: x => x.ProblemGroupId,
                        principalTable: "ProblemsGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Competitors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    BirthDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Gender = table.Column<int>(type: "integer", nullable: false),
                    BirthPlace = table.Column<string>(type: "text", nullable: false),
                    BirthProvince = table.Column<string>(type: "text", nullable: false),
                    AddressCity = table.Column<string>(type: "text", nullable: false),
                    AddressProvince = table.Column<string>(type: "text", nullable: false),
                    AddressStreet = table.Column<string>(type: "text", nullable: false),
                    AddressNumber = table.Column<string>(type: "text", nullable: false),
                    IsMinor = table.Column<bool>(type: "boolean", nullable: false),
                    CompetitionId = table.Column<Guid>(type: "uuid", nullable: false),
                    RegistrationId = table.Column<Guid>(type: "uuid", nullable: false),
                    GuardianOnly = table.Column<bool>(type: "boolean", nullable: false),
                    MinorRegistrationId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Competitors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Competitors_Competitions_CompetitionId",
                        column: x => x.CompetitionId,
                        principalTable: "Competitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Registrations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    CompetitionId = table.Column<Guid>(type: "uuid", nullable: false),
                    CompetitorId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Registrations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Registrations_Competitions_CompetitionId",
                        column: x => x.CompetitionId,
                        principalTable: "Competitions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Registrations_Competitors_CompetitorId",
                        column: x => x.CompetitorId,
                        principalTable: "Competitors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Competitions_PrivacyAttachmentId",
                table: "Competitions",
                column: "PrivacyAttachmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Competitors_CompetitionId",
                table: "Competitors",
                column: "CompetitionId");

            migrationBuilder.CreateIndex(
                name: "IX_Competitors_MinorRegistrationId",
                table: "Competitors",
                column: "MinorRegistrationId");

            migrationBuilder.CreateIndex(
                name: "IX_Problems_ProblemGroupId",
                table: "Problems",
                column: "ProblemGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ProblemsGroups_CompetitionId",
                table: "ProblemsGroups",
                column: "CompetitionId");

            migrationBuilder.CreateIndex(
                name: "IX_Registrations_CompetitionId",
                table: "Registrations",
                column: "CompetitionId");

            migrationBuilder.CreateIndex(
                name: "IX_Registrations_CompetitorId",
                table: "Registrations",
                column: "CompetitorId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SpecialProblems_CompetitionId",
                table: "SpecialProblems",
                column: "CompetitionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Competitors_Registrations_MinorRegistrationId",
                table: "Competitors",
                column: "MinorRegistrationId",
                principalTable: "Registrations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Competitions_Files_PrivacyAttachmentId",
                table: "Competitions");

            migrationBuilder.DropForeignKey(
                name: "FK_Competitors_Competitions_CompetitionId",
                table: "Competitors");

            migrationBuilder.DropForeignKey(
                name: "FK_Registrations_Competitions_CompetitionId",
                table: "Registrations");

            migrationBuilder.DropForeignKey(
                name: "FK_Competitors_Registrations_MinorRegistrationId",
                table: "Competitors");

            migrationBuilder.DropTable(
                name: "Problems");

            migrationBuilder.DropTable(
                name: "SentProblems");

            migrationBuilder.DropTable(
                name: "SentSpecialProblems");

            migrationBuilder.DropTable(
                name: "SpecialProblems");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "ProblemsGroups");

            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropTable(
                name: "Competitions");

            migrationBuilder.DropTable(
                name: "Registrations");

            migrationBuilder.DropTable(
                name: "Competitors");
        }
    }
}
