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
            "City Accounting Office" => "cao",
            "City Administrator's Office" => "cadmin",
            "City Administrator's Office - Bids & Awards Committee Section" => "cadmin_bac",
            "City Administrator's Office - Culture, Arts, Investment Promotion & Tourism Office" => "ctourism",
            "City Agriculture Office" => "cagri",
            "City Assessor's Office" => "cassess",
            "City Budget Office" => "cbudget",
            "City Civil Registry Office" => "ccivilreg",
            "City Cooperative and Manpower Development Office" => "ccoopmd",
            "City Engineering Office" => "ceng",
            "City Environment & Natural Resources Office" => "cenro",
            "City General Services Office" => "cgenserv",
            "City Health Office" => "chealth",
            "City Legal Office" => "clegal",
            "City Mayor's Office" => "cmayor",
            "City Planning and Development Office" => "cplan",
            "City Public Safety Office" => "csafety",
            "City Social Welfare & Development Office" => "cswdo",
            "City Treasurer's Office" => "ctreas",
            "City Veterinary Office" => "cveto",
            "City Vice-Mayor's Office" => "cvmo",
            "DepEd/Bayawan East Central School" => "deped_eastcs",
            "DepEd/Bayawan National High School" => "deped_bnchs",
            "Office of the Human Resource Management and Dev't" => "hrmdo",
            "Internal Audit Services Section" => "ias",
            "Information Technology Office" => "ito",
            "Local Disaster and Risk Reduction Management Office" => "ldrrmo",
            "Media Bureau" => "media",
            "National Agencies" => "nat_agency",
            "Office of the Secretary to the Sangguniang Panglungsod" => "sp_sec",
            "Public Market & Slaughterhouse" => "pmarket_sh",
            "Sangguniang Panglungsod" => "sp",
        ];

        foreach ($departments as $department => $username) {
            $plainPassword = Str::random(8);

            User::create([
                'department' => $department,    
                'username' => $username,
                'password' => Hash::make($plainPassword),
                'status' => 'active',
            ]);

            // dd("Username: {$username} | Password: {$plainPassword} | Department: {$department}");
            $this->command->info("Username: {$username} | Password: {$plainPassword} | Department: {$department}");
        }
    }
}
