import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

interface Notification {
  id: string;
  type: 'quotation' | 'payment' | 'approval' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

interface NotificationSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ isOpen, onClose }) => {
  const { user } = useAppContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simular notificaciones según el rol del usuario
  useEffect(() => {
    const mockNotifications: Notification[] = [];
    
    if (user?.role === 'purchases') {
      mockNotifications.push(
        {
          id: '1',
          type: 'quotation',
          title: 'Nueva Cotización Recibida',
          message: 'Proveedor A ha enviado una cotización para "Suministro de Materiales de Oficina"',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutos atrás
          isRead: false,
          priority: 'high',
          actionUrl: '/purchases/quotations'
        },
        {
          id: '2',
          type: 'quotation',
          title: 'Cotización Aprobada',
          message: 'La cotización de Proveedor B para "Servicio de Limpieza" ha sido aprobada',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutos atrás
          isRead: true,
          priority: 'medium',
          actionUrl: '/purchases/quotations'
        }
      );
    }

    if (user?.role === 'finance') {
      mockNotifications.push(
        {
          id: '3',
          type: 'payment',
          title: 'Factura Pendiente de Revisión',
          message: 'Nueva factura de Proveedor C por $15,000 requiere aprobación',
          timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutos atrás
          isRead: false,
          priority: 'high',
          actionUrl: '/finance/invoices'
        },
        {
          id: '4',
          type: 'payment',
          title: 'Pago Programado',
          message: 'Pago de $8,500 a Proveedor A programado para mañana',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 horas atrás
          isRead: true,
          priority: 'medium',
          actionUrl: '/finance/payments'
        }
      );
    }

    if (user?.role === 'admin') {
      mockNotifications.push(
        {
          id: '5',
          type: 'approval',
          title: 'Nuevo Proveedor Registrado',
          message: 'Proveedor D ha completado su registro y requiere aprobación',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutos atrás
          isRead: false,
          priority: 'high',
          actionUrl: '/admin/users'
        },
        {
          id: '6',
          type: 'system',
          title: 'Reporte Mensual Generado',
          message: 'El reporte de compras y pagos del mes ha sido generado automáticamente',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 día atrás
          isRead: true,
          priority: 'low',
          actionUrl: '/admin/dashboard'
        }
      );
    }

    if (user?.role === 'provider') {
      mockNotifications.push(
        {
          id: '7',
          type: 'quotation',
          title: 'Cotización Enviada',
          message: 'Tu cotización para "Suministro de Materiales" ha sido recibida',
          timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(), // 20 minutos atrás
          isRead: false,
          priority: 'medium',
          actionUrl: '/providers/dashboard'
        },
        {
          id: '8',
          type: 'payment',
          title: 'Pago Recibido',
          message: 'Se ha procesado el pago de $6,500 por servicios prestados',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 horas atrás
          isRead: true,
          priority: 'medium',
          actionUrl: '/providers/payments'
        }
      );
    }

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
  }, [user]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const getNotificationIcon = (type: string) => {
    const icons = {
      quotation: '📋',
      payment: '💰',
      approval: '✅',
      system: '⚙️'
    };
    return icons[type as keyof typeof icons] || '📢';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'priority-low',
      medium: 'priority-medium',
      high: 'priority-high'
    };
    return colors[priority as keyof typeof colors] || 'priority-medium';
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Ahora mismo';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)}h`;
    return notificationTime.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <div className="notification-overlay" onClick={onClose}>
      <div className="notification-panel" onClick={(e) => e.stopPropagation()}>
        <div className="notification-header">
          <h3>🔔 Notificaciones</h3>
          <div className="notification-actions">
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="btn btn-secondary btn-sm"
              >
                Marcar todas como leídas
              </button>
            )}
            <button onClick={onClose} className="notification-close">✕</button>
          </div>
        </div>

        <div className="notification-content">
          {notifications.length === 0 ? (
            <div className="empty-notifications">
              <div className="empty-icon">🔔</div>
              <p>No hay notificaciones</p>
              <small>Las notificaciones aparecerán aquí cuando haya actividad</small>
            </div>
          ) : (
            <div className="notifications-list">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${getPriorityColor(notification.priority)} ${!notification.isRead ? 'unread' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <div className="notification-header">
                      <h4 className="notification-title">{notification.title}</h4>
                      <span className="notification-time">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                    <p className="notification-message">{notification.message}</p>
                    {notification.actionUrl && (
                      <a 
                        href={notification.actionUrl}
                        className="notification-action"
                      >
                        Ver detalles →
                      </a>
                    )}
                  </div>
                  {!notification.isRead && (
                    <div className="unread-indicator"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="notification-footer">
          <div className="notification-stats">
            <span>{notifications.length} notificaciones</span>
            {unreadCount > 0 && (
              <span className="unread-count">{unreadCount} sin leer</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSystem; 