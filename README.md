<p align="center">
  <img src="images/logos/Laridae_Transparent_No_Text.png" width="250px"/>
</p>
<h2>Laridae: A zero-downtime, reversible database schema migration tool for PostgreSQL</h2>

Laridae enables reversible, zero-downtime schema migrations in PostgreSQL, synchronizing them with application code deployments for apps using ECS Fargate. It allows application instances expecting the pre-migration and post-migration schema to simultaneously use the same database without requiring changes to either version's code and for recent schema migrations to be reversed without data loss. This is accomplished with minimal interference with normal reads and writes to the database.

Laridae integrates this schema migration functionality into a deployment pipeline hosted on GitHub Actions. It creates the necessary infrastructure inside users' AWS account to allow GitHub Actions to communicate with your private PostgreSQL database securely and coordinates schema changes with code deployments.

# 🏠 [Homepage](https://github.com/2308-team-8/laridae)
