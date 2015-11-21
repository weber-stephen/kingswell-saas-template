angular.module('app')
.constant("EVENTS", {
  MESSAGE_INCOMING:'socket:messageIncoming',
  SERVER_LOAD_INCOMING:'socket:serverLoad',
  SIDEBAR_RIGHT_TAB_MESSAGE_SELECT:'sidebar:right:tab:messageSelect',
  SIDEBAR_RIGHT_TAB_NOTIFICATION_SELECT:'sidebar:right:tab:notificationSelect',
  SIDEBAR_RIGHT_TAB_TASK_SELECT:'sidebar:right:tab:taskSelect'
});