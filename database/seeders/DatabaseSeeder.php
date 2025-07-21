<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $departments = [
            ["department" => "City Accounting Office", "username" => "cao", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Administrator's Office", "username" => "cadmin", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Administrator's Office - Bids & Awards Committee Section", "username" => "cadmin_bac", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 20]]], "roles" => ['editor']],
            ["department" => "City Administrator's Office - Culture, Arts, Investment Promotion & Tourism Office", "username" => "ctourism", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 430, "fontSize" => 17]]], "roles" => ['editor']],
            ["department" => "City Agriculture Office", "username" => "cagri", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Assessor's Office", "username" => "cassess", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Budget Office", "username" => "cbudget", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Civil Registry Office", "username" => "ccivilreg", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Cooperative and Manpower Development Office", "username" => "ccoopmd", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Engineering Office", "username" => "ceng", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Environment & Natural Resources Office", "username" => "cenro", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City General Services Office", "username" => "cgenserv", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Health Office", "username" => "chealth", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Legal Office", "username" => "clegal", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Mayor's Office", "username" => "cmayor", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Planning and Development Office", "username" => "cplan", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Public Safety Office", "username" => "csafety", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Social Welfare & Development Office", "username" => "cswdo", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Treasurer's Office", "username" => "ctreas", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Veterinary Office", "username" => "cveto", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City Vice-Mayor's Office", "username" => "cvmo", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "DepEd/Bayawan East Central School", "username" => "deped_eastcs", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "DepEd/Bayawan National High School", "username" => "deped_bnchs", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "Office of the Human Resource Management and Dev't", "username" => "hrmdo", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['sudo_admin']],
            ["department" => "Internal Audit Services Section", "username" => "ias", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "Information Technology Office", "username" => "ito", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "Local Disaster and Risk Reduction Management Office", "username" => "ldrrmo", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "Media Bureau", "username" => "media", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "National Agencies", "username" => "nat_agency", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "Office of the Secretary to the Sangguniang Panglungsod", "username" => "sp_sec", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 20]]], "roles" => ['editor']],
            ["department" => "Public Market & Slaughterhouse", "username" => "pmarket_sh", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "Sangguniang Panglungsod", "username" => "sp", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
            ["department" => "City College of Bayawan", "username" => "ccb", "configs" => ["office_id_template" => ["department" => ["xAxis" => 10, "yAxis" => 445, "fontSize" => 21]]], "roles" => ['editor']],
        ];


        foreach ($departments as $department) {
            $plainPassword = Str::random(8);

            User::create([
                'department' => $department['department'],    
                'username' => $department['username'],
                'password' => Hash::make($plainPassword),
                'configs' => $department['configs'],
                'roles' => json_encode($department['roles']),
                'status' => 'active',
            ]);

            // dd("Username: {$username} | Password: {$plainPassword} | Department: {$department}");
            $this->command->info("Username: {$department['username']} | Password: {$plainPassword} | Department: {$department['department']}");
        }
    }
}
