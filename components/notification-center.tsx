"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Bell, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function NotificationCenter({ onClose }) {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications")
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications))
    }
  }, [])

  const clearAllNotifications = () => {
    localStorage.setItem("notifications", JSON.stringify([]))
    setNotifications([])
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "team_followed":
      case "tournament_followed":
      case "registration":
      case "login":
      case "profile_updated":
      case "email_updated":
      case "password_updated":
      case "settings_updated":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Bell className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-background border rounded-md shadow-md z-50">
      <div className="p-3 flex items-center justify-between border-b">
        <h3 className="font-medium">Notifications</h3>
        <Button variant="ghost" size="sm" onClick={clearAllNotifications} title="Clear all notifications">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[400px]">
        {notifications.length > 0 ? (
          <ul className="divide-y divide-border">
            {notifications.map((notification) => (
              <li key={notification.id} className="p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-muted-foreground">{notification.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(notification.date).toLocaleString()}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center">
            <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No notifications</p>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
