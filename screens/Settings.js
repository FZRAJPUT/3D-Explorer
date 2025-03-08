import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Animated,
  Platform,
  useColorScheme as _useColorScheme,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

// Custom hook for theme management
const useColorScheme = () => {
  const deviceTheme = _useColorScheme()
  const [theme, setTheme] = useState(deviceTheme || "light")

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"))
  }

  return { theme, toggleTheme }
}

// Setting Item Component
const SettingItem = ({ icon, title, description, isSwitch, value, onValueChange, onPress, theme }) => {
  const colors = theme === "dark" ? darkColors : lightColors

  return (
    <TouchableOpacity
      style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingIconContainer}>
        <Ionicons name={icon} size={22} color={colors.accent} />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
        {description && <Text style={[styles.settingDescription, { color: colors.subtext }]}>{description}</Text>}
      </View>
      {isSwitch && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.switchTrackOff, true: colors.switchTrackOn }}
          thumbColor={value ? colors.switchThumbOn : colors.switchThumbOff}
          ios_backgroundColor={colors.switchTrackOff}
        />
      )}
      {!isSwitch && <Ionicons name="chevron-forward" size={20} color={colors.subtext} />}
    </TouchableOpacity>
  )
}

// Section Header Component
const SectionHeader = ({ title, theme }) => {
  const colors = theme === "dark" ? darkColors : lightColors

  return (
    <View style={styles.sectionHeader}>
      <Text style={[styles.sectionHeaderText, { color: colors.accent }]}>{title}</Text>
    </View>
  )
}

// Theme Toggle Component
const ThemeToggle = ({ theme, toggleTheme }) => {
  const colors = theme === "dark" ? darkColors : lightColors
  const translateX = useState(new Animated.Value(theme === "dark" ? 28 : 0))[0]

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: theme === "dark" ? 28 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [theme])

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleTheme}
      style={[styles.themeToggle, { backgroundColor: theme === "dark" ? "#1A1A2E" : "#E0E0E0" }]}
    >
      <Animated.View
        style={[
          styles.themeToggleThumb,
          { transform: [{ translateX }] },
          { backgroundColor: theme === "dark" ? "#5C5CFF" : "#FFD700" },
        ]}
      >
        <Ionicons
          name={theme === "dark" ? "moon" : "sunny"}
          size={16}
          color={theme === "dark" ? "#FFFFFF" : "#FF8C00"}
        />
      </Animated.View>
    </TouchableOpacity>
  )
}

// Color schemes
const lightColors = {
  background: "#F8F9FA",
  cardBackground: "#FFFFFF",
  text: "#212121",
  subtext: "#757575",
  accent: "#6200EE",
  border: "#E0E0E0",
  switchTrackOn: "rgba(98, 0, 238, 0.5)",
  switchTrackOff: "#E0E0E0",
  switchThumbOn: "#6200EE",
  switchThumbOff: "#F1F1F1",
  headerGradient: ["#6200EE", "#9500FF"],
}

const darkColors = {
  background: "#121212",
  cardBackground: "#1E1E1E",
  text: "#FFFFFF",
  subtext: "#BBBBBB",
  accent: "#BB86FC",
  border: "#2C2C2C",
  switchTrackOn: "rgba(187, 134, 252, 0.5)",
  switchTrackOff: "#3A3A3A",
  switchThumbOn: "#BB86FC",
  switchThumbOff: "#5A5A5A",
  headerGradient: ["#3700B3", "#6200EE"],
}

// Main Settings Screen
export default function SettingsScreen() {
  const { theme, toggleTheme } = useColorScheme()
  const colors = theme === "dark" ? darkColors : lightColors

  const [notifications, setNotifications] = useState(true)
  const [locationServices, setLocationServices] = useState(false)
  const [dataSync, setDataSync] = useState(true)

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient colors={colors.headerGradient} style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Settings</Text>
          {/* <ThemeToggle theme={theme} toggleTheme={toggleTheme} /> */}
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Appearance" theme={theme} />
        <SettingItem
          icon="color-palette-outline"
          title="Theme"
          description={`Currently using ${theme} mode`}
          isSwitch={true}
          value={theme === "dark"}
          onValueChange={toggleTheme}
          theme={theme}
        />
        <SettingItem
          icon="text-outline"
          title="Font Size"
          description="Adjust text display"
          onPress={() => {}}
          theme={theme}
        />

        <SectionHeader title="Notifications" theme={theme} />
        <SettingItem
          icon="notifications-outline"
          title="Push Notifications"
          description="Receive alerts and updates"
          isSwitch={true}
          value={notifications}
          onValueChange={setNotifications}
          theme={theme}
        />
        <SettingItem
          icon="mail-outline"
          title="Email Notifications"
          description="Get updates via email"
          isSwitch={true}
          value={dataSync}
          onValueChange={setDataSync}
          theme={theme}
        />

        <SectionHeader title="Privacy" theme={theme} />
        <SettingItem
          icon="location-outline"
          title="Location Services"
          description="Allow app to access your location"
          isSwitch={true}
          value={locationServices}
          onValueChange={setLocationServices}
          theme={theme}
        />

        <SectionHeader title="Account" theme={theme} />
        <SettingItem
          icon="person-outline"
          title="Profile Information"
          description="Manage your personal details"
          onPress={() => {}}
          theme={theme}
        />
        <SettingItem
          icon="key-outline"
          title="Change Password"
          description="Update your security credentials"
          onPress={() => {}}
          theme={theme}
        />
        <SettingItem icon="log-out-outline" title="Sign Out" onPress={() => {}} theme={theme} />

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.subtext }]}>App Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 8,
    paddingLeft: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  themeToggle: {
    width: 56,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: "center",
  },
  themeToggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
  },
})