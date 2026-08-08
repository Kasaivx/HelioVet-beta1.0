"use client";

import { Calendar, AlertCircle, Clock, TrendingUp } from "lucide-react";
import { StatCard } from "./stat-card ";
import { QuickActionCard } from "./quick-action-card";
//import { UpcomingAppointments } from "./upcoming-appointments";
import { AlertsList } from "./alerts-list";

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to HelioVet</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Appointments"
          value="8"
          icon={Calendar}
          trend="+2 from yesterday"
          className="bg-blue-50 border-blue-100"
        />
        <StatCard
          title="Patients in Queue"
          value="3"
          icon={Clock}
          trend="Average wait: 12 min"
          className="bg-emerald-50 border-emerald-100"
        />
        <StatCard
          title="Critical Alerts"
          value="2"
          icon={AlertCircle}
          trend="Requires attention"
          className="bg-red-50 border-red-100"
        />
        <StatCard
          title="Monthly Revenue"
          value="$12.4K"
          icon={TrendingUp}
          trend="+8% from last month"
          className="bg-amber-50 border-amber-100"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
       
        </div>

        {/* Critical Alerts */}
        <div>
          <AlertsList />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <QuickActionCard
            label="Schedule Appointment"
            action="New"
            bgColor="bg-primary/5"
          />
          <QuickActionCard
            label="Add Patient Record"
            action="New"
            bgColor="bg-secondary/20"
          />
          <QuickActionCard
            label="View Inventory"
            action="Check"
            bgColor="bg-accent/30"
          />
          <QuickActionCard
            label="Generate Report"
            action="Export"
            bgColor="bg-primary/5"
          />
        </div>
      </div>
    </div>
  );
}
